---
title: Architecting ElectronJS Applications
tags: ["ElectronJS","javascript", "NodeJS", "Architecture", "desktop"]
date: 2020-03-09T00:00:00.000Z
path: blog/architecting-electronjs-applications
cover: ./electron-logo.png
excerpt: How to structure effective communication in an ElectronJS application.
---

ElectronJS is a customized runtime that allows the development of traditional desktop applications with JavaScript programming language. Electron has two major processes which are called the main process and the renderer process. The main process is the NodeJS like runtime while the renderer has the chrome WebView for display. It is traditionally best to put the core logic especially the expensive ones on the main process as well has shared state logic for the renderer process (Browser Window). There is no standard way to architect electron apps since they have different requirements.

The various approaches include:

1.  Remote procedure Calls.

2.  Inter Process Communication.

3.  Web server.

### Remote Procedure Calls (RPC).

This approach primary involves invoking remote procedure calls (RPC). The renderer process can remotely require modules and execute it on the main process. The RPC focused styled front-end (Web App) becomes difficult to be migrated since the remote function call doesn\`t exist on the traditional browser windows. This approach doesn't enforce separation of concerns for both the main and renderer process are intertwined together which can be a debugging night mare for complex apps.
```typescript
// Main process
import { app, BrowserWindow, dialog } from 'electron' // eslint-disable-line
import PouchDB from 'pouchdb';
import * as path from 'path';
import { writeFile } from 'fs';

process.env.PALACE_PROJECT = path.join(process.env.LOCALAPPDATA, 'palace');

PouchDB.plugin(require('pouchdb-find'));
global.memberDB = new PouchDB(path.join(process.env.PALACE_PROJECT, 'database'));
....
app.on('ready', createWindow);
// Renderer process (somewhere in the web app code)
/** get the members database collection from global */
const memberDb = window.require('electron').remote.getGlobal('memberDB');
// retrieves a single member
const getMember = memberDb.get;
....
```

### Inter Process Communication (IPC).

The electron runtime allows an event driven communication for both the renderer and main processes. The event driven approach consists of a listener and an emitter which can exist on either the main or renderer process. The event payload must be JSON serializable before sending across to the other process. The level of abstraction above IPC is determined by the complexity of the app. The render process is not tied to the IPC mode of communication since easier abstraction can be done such that other forms of communications like HTTP and Sockets can be done on it. (I have a blog post coming up on abstracting over IPC protocol and HTTP Request). I generally prefer this approach than exposing a port on the user's machine.
```typescript
/* shared interface to enforce type consistency */
// file -> libs/shared/index.ts
// Enum to differentiate between the event type.
export enum EventBus {
    Request = "Request",
    Response = "Response"
}
// general type information for all API request
export interface ApiFormat<T, K> {
    // used to track events requests and responses.
  id: string;
//   the action key in a MAP or Object
  method: string;
  data: T;
  event: EventBus;
  headers: K;
}
export enum ApiStatus {
    Success = 'success', 
    Failure = 'failure'
}
// general type information for all responses. 
export interface QueryResponse<T> {
  time: number;
  status: ApiStatus;
  reqId: string;
  data?: T;
  error?: string;
}
/* Main process */
// file -> libs/electron/ipc.ts
import { IpcMain, Event } from 'electron';
import { EventBus, ApiFormat } from '../shared';
// takes the event request and returns a BaseResponse
async function executor(ctx: ApiFormat<any, any>): BaseResponse;
export function eventBus(ipc: IpcMain) {
  ipc.on(EventBus.Request, async (event: Event, ctx: ApiFormat<any, any>) => {
    console.info({message: '', trace: '' }, ctx);
    const resp = await executor(ctx);
    console.debug({ message: 'transport', trace: 'eventBus'}, resp);
    event.sender.send(EventBus.Response, resp);
  });
}
/** Render process**/
// file -> libs/renderer/communication.ts
import { IpcRenderer } from 'electron';
import { ApiFormat, EventBus, BaseResponse, ApiStatus } from '../shared';
export function apiFactory<T, K>(
  method: Method,
  data: T,
  headers: K
): ApiFormat<T, K> {
  return {
    method,
    data,
    headers,
    event: EventBus.Request,
    id: uuid()
  };
}
// timeout error if event doesn't quickly return a response
const REQUEST_TIME_OUT = 200000;
// loads the IPC for rendered
const ipc: IpcRenderer = (window as any).require('electron').ipcRenderer;
// takes any event and sends it through the IPC and maps the error accordingly
export function renderEventBus<T extends BaseResponse>(
  ctx: ApiFormat<any, any>,
): Promise<T> {
  ipc.send(EventBus.Request, ctx);
  console.log(ctx);
  return new Promise((resolve, rejects) => {
    ipc.on(EventBus.Response, (event: Event, response: T) => {
      console.log(response);
        if (response.reqId === ctx.id) {
          return resolve(response);
        }
      });
      setTimeout(
        () => rejects(responseTimeoutError(ctx)),
        REQUEST_TIME_OUT - 200,
      );
    // tslint:disable-next-line:align
  });
}
// coercing the error to string for ResponseError
interface ResponseError extends BaseResponse {
  error: string;
}
// handler for timeout error for slow Events over IPC
function responseTimeoutError(ctx: ApiFormat<any, any>): ResponseError {
  return {
    reqId: ctx.id,
    status: ApiStatus.Failure,
    time: Date.now(),
    error: `Api Response Time Out Eluded`,
  };
}
```
### WEB Server.
The electron application can either span an instance of the webserver on the main thread itself or through a child process. It is easier to convert a traditional webserver and web app to an electron app using this approach if done with the child process, the renderer process is forced to behave simply as a traditional browser window without any special functionalities. This approach is good for programs with multiple clients over a LAN and programs wanting to prevent cross-lock of data for multiple instance of the same program on the same PC. I believe is better to avoid opening a port on the user's machine against security risks.
```typescript
// Main process
// file -> main.js
const {app, BrowserWindow} = require('electron')
const application = require('express')();
app.on("ready", function () {
    var window = new BrowserWindow({show: false});
    window.loadURL("file://" + __dirname + "/index.html");
        application.listen(3000);
        console.log("http://localhost:3000/");
    });
});
// Renderer process
// file -> somewhere in the renderer process
async function checkHealth() {
    const resp = await fetch(`http://localhost:3000/api/check`);
    console.log(resp);
}
```
## Summary.
The best approach is subjected to the complexity of your application, which can be determine in terms of complexity, scalability (hosting online) and security.
