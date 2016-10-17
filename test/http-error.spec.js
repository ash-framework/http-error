/* global describe, it */
const assert = require('assert')
const HttpError = require('../src')

describe('http-error', function () {
  it('status provided without message', function () {
    const error = new HttpError(404)

    assert.strictEqual(error.status, 404)
    assert.strictEqual(error.message, 'Not Found')
    assert(/HttpError: 404 Not Found/.test(error.stack))
  })

  it('incorrect status provided', function () {
    assert.throws(() => new HttpError('invalid'))
  })

  it('invalid http status code provided', function () {
    assert.throws(() => new HttpError(1021))
  })

  it('incorrect message provided', function () {
    assert.throws(() => new HttpError(400, 123))
  })

  it('status and message provided', function () {
    const error = new HttpError(500, 'My custom message')

    assert.strictEqual(error.status, 500)
    assert.strictEqual(error.message, 'My custom message')
    assert(/HttpError: 500 My custom message/.test(error.stack))
  })
})
