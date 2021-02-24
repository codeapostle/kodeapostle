---
title: The Wizard’s Abstraction.
tags: ["Architecture", "software", "clean code"]
date: 2020-05-29T00:00:00.000Z
path: blog/the-wizards-abstraction
cover: ./abstract-wizard.png
excerpt: How and when to create abstractions over repeated functions.
---

> Have you met a witch or a wizard who loves generics like me, you will
> understand the “A god function, it does all things and create all
> things but it’s used in all but different weird ways”?

Personally, wrong abstractions are the costliest and, in some cases, too costly to count. What is worse than zero abstraction or the wrong abstraction, the thing about a duplicated codebase is, it still exhibits an implicit abstraction of its behaviour of some sort. The ultimate goal of a good abstraction is providing complete information of a system part, rather than a misrepresentation of its part. To know you have a good abstraction, explaining it and using it is very simple and catchy. The really popular question most of us ask is when and how do wrong abstractions occur. The real truth is every abstraction is good and bad, the best abstractions have what others don’t have, which is a boundary of servitude.

An example would be a dynamic form generator which takes a configuration to produce a consistent behaved form list. The generator didn’t factor in various components it was forced to accommodate, a simple switch statement to select the fields became a glorious module and various forceful styling at its best. The component with different weird implementation hiding behind the abstraction forcefully. The first smell of implementing the wrong abstraction is that it is been ***forced to present a consistent representation*** of itself.

Consider an interface for Animals first, what pops into your mind, a dog, cat, mouse then consider another interface Mammal. The scope of thought is now different, right, because an animal can either be higher or lower class in nature but everyone tries unconsciously to create an abstraction for an Animal first. The second smell of abstraction is ***it’s too broad***, the larger the surface area of abstraction the small it’s usability and dependability. Consider a lower animal class commanded to execute a jump function, you get the point. The usability might be calling a consistent representation but a broad abstraction always encourages weird implementations beneath, your abstraction is great, but someone else implementation might just be bad, even yours.

It’s difficult to rewrite an old or wrong abstraction simply because people have written and adapted to their weird ways of interaction, rewriting means supporting the weird acceptable, patchable flaws. You might argue we rewrite to correct the mistakes but always remember you are probably only correction your scope or the context familiar with you.

How do we correct wrong abstractions, if you have a codebase of 500 lines of code which equal 6000 lines of code but can behave in 6000 different ways? My recommended way of solving it is the grafting technique, which simply means localizing the surface area of your abstraction instead of expanding it, imagine you have two modules one for video encoding and audio conversion, it will be best to localize any abstraction in audio implementation independent of the video module. i.e. A consistent interface for various audio codecs. (expanding the codecs to video, is just too far).

Is it possible to ditch an old abstraction, YES, I have done it before, simply because it follows a consistent pattern with the abstraction that replaced it.

How do you know abstraction is justified, let the domain present similar behaviour which is localized not you.
