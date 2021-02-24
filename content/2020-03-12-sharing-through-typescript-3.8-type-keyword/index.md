---
title: Sharing Through Typescript (3.8) type Keyword
tags: ["Typescript", "NodeJS", "folder Structure"]
date: 2020-03-03T00:00:00.000Z
path: blog/sharing-through-typescript-3.8-type-keyword
cover: ./type-keyword-code.png
excerpt: How to easily share typescript type information and code easily across mutiple projects.
---

Typescript is one of my favorite tools which delivers on its promise which has made JavaScript development easy and fun. Typescript type checking and easy feedback with the language server for various IDEs has been a bliss,it's ability to share type information across projects in big-medium size projects but it has also increased the desire share more type information only which had been a daunting task especially if has to be collated across sub modules until the **type** keyword was born. An example that would be used is an hypothetical chemical compound simulator sharing **type, variables and functions** between a react frontend and a NodeJS backend written in typescript. Using the example has a case study I will demonstrate various approaches I have taken before and also after the type keyword was introduced.

### Before:

The way I structure code and type information that needed to be shared was segmented into two approaches which are:

1.  Environment based approach.

2.  Context based approach.

Irrespective of my approach without the __type__ keyword, I can't export type information only but can share code which I don't want to prevent unwanted dependency.

#### Environment Based Approach.

This approach suggested that the code should be separated depending on the environments that they run such that for our example's case, the project would have three different folders, which are:

-   Platform shared: This folder contains files which are subset of modules actually shared by both the browser and NodeJS. This folder restricts the importing of native NodeJS and browser Window based modules, since window properties doesn't exit in NodeJS and native modules are also missing from the browser. This folder also restricts importing one-sided used imports such that if it's not used by both, it's not wanted there. The `elements.ts` contains various chemical elements names, symbols, group and period type definitions.

-   Web: This folder contains the react source code and imports the platform shared and has no interaction with the Server folder.The `element-orbit` uses depends on `platform-shared/lib/elements` for the server response type definition and selection of various periodic elements for compound combinations.

-   Server: This folder contains native modules and the server business logic itself, it imports the platform-shared and has no need for web dependent modules.The `compound-simulation` uses depends on `platform-shared/lib/elements` for type definitions and calculations for the chemical combinations
``` ts
  apps
    |
    |-platform-shared
    |     |- index.ts
    |     |- package.json
    |     |- lib/elements.ts
    |-web-app
    |    |- package.json
    |    |- src
    |        |- element-orbit.tsx
    |        |- index.tsx
    |        |- app.tsx
    |-server
    |    |-package.json
    |    |-src
    |       |-app.ts
    |       |-lib/compound-simulation.ts
```
> The platform shared folder is transpiled to JavaScript and symlink using ```yarn link``` command and utilized using {name} which is in the folder __package.json__.

#### Context Based Approach.

This approach suggest that the code should be group and located in the same folder instead of mirroring modules structure in the environment approach. This style doesn't remove the code from their context and can be reason about easily. Using our example as a case study again, the base folder would be two, the structure is shown below:

-   NodeJS: This folder contains multiple sub modules used by NodeJS, all the sub modules will have a folder called frontend which collates all the exported properties through index.ts from them. The sub modules also have a folder called frontend but exports other modules frontend.ts files. The frontend folder is transpiled and symlink like the platform shared above.
```ts
// simulation/front-end.ts
export * from './element';
// i couldn't export from util which uses fs module not used by the browser
// util/front-end.ts
export * from './logger'; // bad, it won't work
// front-end/index.ts
export * from '../util/front-end';
export * from '../simulation/front-end';
 ```
-   Web: This folder contains the client source files and imports the frontend folder module name.
``` ts
apps
    |
    |- web-app
    |   |- package.json
    |   |- src/element-orbit.tsx
    |   |- src/index.tsx
    |   |- src/app.tsx
    |- server
        |- package.json
        |- src
           |- app.ts
           |- lib
              |- util/logger.ts
              |- util/front-end.ts
              |- simulation/element.ts
              |- simulation/front-end.ts
              |- simulation/compound-simulation.ts
              |- front-end/index.ts
              |- front-end/package.json
```

### After:

Since the type keyword now exists in typescript 3.8 and we can now iterate on the context and environment-based approach by mixing them. We can drop unwanted code exporting with type keyword selectively instead of using \* for the target module or file. If there are some code, we wish to export, we will separate it to a file which can be exported meaning inside our context-based structure, when we fundamentally export, we do it with environment-based approach.
```typescript
// simulation/front-end.ts
export type { Period, Group } from './element';
// util/front-end.ts
export type { AppLog } from './logger';
// we can now export from compound-simulation which imports fs module
export type { SimulatedCompound } from './element';
// note: using type keyword with * will not work so the type keyword is selecctive
export type * from './element'; // will not work

```
## Summary.

The type keyword gives as a flexibility to export type information irrespective of environments and allow easier collation of type information across modules.
