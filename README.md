# copylot

Web-app for sciencing with python. [experimental]

- Like ipynb, but 2D
- Refactor code by copy-pasting :)


## Understanding the code

- The app is built using [React](https://reactjs.org/), which updates the DOM for us when app state changes. If you are new to React, I recommend the ['Main Concepts' section](https://reactjs.org/docs/hello-world.html) of their docs.

- The app is written in [TypeScript](https://www.typescriptlang.org/), a typed superset of JavaScript. `*.tsx` files contain typescript _and_ html elements to be rendered ([JSX syntax](https://reactjs.org/docs/introducing-jsx.html)).

- Styling is done with [Tailwind CSS](https://tailwindcss.com/).
  Hence why there are no handwritten CSS rules, but rather a lot of classes on html elements. If you wonder what any of these classes do, type them into the search function of their [docs](https://tailwindcss.com/docs/utility-first) -- for example `p-1`, which adds a bit of padding on all sides.


## Development environment

- Make sure you have [Node](https://nodejs.org/en) installed (which includes `npm`).

- Run the app locally with `npm start`. The first time, this will install all dependencies. The app will auto-reload when saving code changes.

- I use Visual Studio Code as IDE here, which has support for `.tsx` out of the box. Tailwind CSS has a [plugin](https://github.com/tailwindlabs/tailwindcss-intellisense) for intellisense.
