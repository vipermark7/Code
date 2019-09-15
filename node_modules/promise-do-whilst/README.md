# promise-do-whilst [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Calls a function repeatedly while a condition returns true and then resolves the promise

- See Also
  - [promise-whilst](https://github.com/sindresorhus/promise-whilst)
  - [promise-until](https://github.com/busterc/promise-until)
  - [promise-do-until](https://github.com/busterc/promise-do-until)

## Installation

```sh
$ npm install --save promise-do-whilst
```

## Usage

```js
import promiseDoWhilst from 'promise-do-whilst';

let count = 0;

promiseDoWhilst(() => {
  count++;
}, () => {
  return count < 5;
}).then(() => {
  console.log(count);
  // => 5
});

// ...

let max = 0;

promiseDoWhilst(() => {
  max++;
}, () => {
  return max < 1;
}).then(() => {
  console.log(max);
  // => 1
});

```

## API

### promiseDoWhilst(action, condition)

Executes `action` repeatedly while `condition` returns `true` and then resolves the promise. Rejects if `action` returns a promise that rejects or if an error is thrown anywhere.

#### action

Type: `function`

Action to run for each iteration.

You can return a promise and it will be handled.

#### condition

Type: `function`

Should return a boolean of whether to continue.

## License

ISC © [Buster Collings]()


[npm-image]: https://badge.fury.io/js/promise-do-whilst.svg
[npm-url]: https://npmjs.org/package/promise-do-whilst
[travis-image]: https://travis-ci.org/busterc/promise-do-whilst.svg?branch=master
[travis-url]: https://travis-ci.org/busterc/promise-do-whilst
[daviddm-image]: https://david-dm.org/busterc/promise-do-whilst.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/busterc/promise-do-whilst
