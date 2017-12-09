'use strict'

var window = require('global/window')

module.exports = (function hasGeolocation (navigator) {
  return 'geolocation' in navigator && typeof navigator.geolocation.getCurrentPosition === 'function'
})(window.navigator || {})
