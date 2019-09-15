/*!
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 Mark van Seventer
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// Strict mode.
'use strict'

// Package modules.
const debug = require('debug')('multiyargs:log')
const doWhilst = require('promise-do-whilst')

// Exports.
module.exports = (cli, argv, context) => {
  // Extract global options.
  const options = cli.getOptions()
  const globalOptions = Object.keys(options.key).filter((option) => {
    return options.local.indexOf(option) === -1
  })

  // Cast arguments.
  argv = argv || process.argv.slice(2)
  context = context || { }

  // Debug.
  debug('argv: %o', argv)

  // Parse arguments.
  let result = [ ] // Init.
  const promise = doWhilst(() => {
    // Get next slice.
    const until = argv.indexOf('--') + 1
    const slice = until ? argv.splice(0, until) : argv.splice(0)

    // Debug.
    debug('parsing slice: %o', slice)

    // Parse slice.
    return cli.parse(slice, context, (err, args, output) => {
      // Stop on error or output.
      if (err || output) throw err || output

      // Retain global options.
      globalOptions.forEach((opt) => {
        const value = args[opt]
        if (undefined !== value) context[opt] = value
      })

      // Append args to result.
      result.push(args)
    })
  }, () => argv.length)

  // Return the result.
  return promise.then(() => result)
}
