'use strict'

const ArgumentError = require('@ash-framework/argument-error')
const { STATUS_CODES } = require('http')

const _status = new WeakMap()

function validateInput (status, message) {
  if (typeof status !== 'number') {
    throw new ArgumentError('HttpError', 'status', `expected a "Number" but a "${typeof status}" was given`)
  }
  if (message && typeof message !== 'string') {
    throw new ArgumentError('HttpError', 'message', `expected a "String" but a "${typeof message}" was given`)
  }
  if (!STATUS_CODES[status]) {
    throw new ArgumentError('HttpError', 'message', `expected a valid http status code but "${status}" given`)
  }
}

module.exports = class HttpError extends Error {
  constructor (status, message) {
    validateInput(status, message)
    super(message || STATUS_CODES[status])

    this.name = this.constructor.name
    this.stack = this.stack.replace(`${this.name}: `, `${this.name}: ${status} `)

    _status.set(this, status)
  }

  get status () {
    return _status.get(this)
  }

  set status (code) {
    _status.set(this, code)
  }
}
