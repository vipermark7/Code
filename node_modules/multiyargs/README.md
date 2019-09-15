# multiyargs
> Like [yargs](https://github.com/yargs/yargs), but with support for multiple commands.

## Installation
`$ npm install multiyargs`

## Usage
Create your CLI as usual, but pass it through `multiyargs` instead of calling `yargs.argv`.

`$ cli command1 --foo -- command2 --bar -- command3 --no-foo`

```
const cli = require('yargs')
  .command('command1', (builder) => { builder.option('foo', { type: 'boolean' }) })
  .command('command2', (builder) => { builder.option('bar', { type: 'boolean' }) })
  .command('command3', (builder) => { builder.option('foo', { type: 'boolean' }) })
;

const promise = require('multiyargs')(cli, process.argv.slice(2));
promise.then((args) => { ... })
/**
[ { _: [ 'command1' ], foo: true, '$0': 'cli' },
  { _: [ 'command2' ], bar: true, '$0': 'cli' },
  { _: [ 'command3' ], foo: false, '$0': 'cli' } ]
 */
```

## Debugging
Use `DEBUG=multiyargs:*` to inspect how `multiyargs` does its thing.

`$ DEBUG=multiyargs:* cli command1 --foo -- command2 --bar -- command3 --no-foo`

## Changelog
See the [Changelog](./CHANGELOG.md) for a list of changes.

## License
    The MIT License (MIT)

    Copyright (c) 2017 Mark van Seventer

    Permission is hereby granted, free of charge, to any person obtaining a copy of
    this software and associated documentation files (the "Software"), to deal in
    the Software without restriction, including without limitation the rights to
    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
    FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
    COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
    IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.