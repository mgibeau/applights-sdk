const colorMap = require('../effects/color-map')
const EFFECTS = require('../effects')
const BluetoothService = require('../bluetooth-service')
const nearestColor = require('nearest-color').from(colorMap)

const SERVICES = require('./services')
const CHARS = require('./characteristics').STRINGS_CONTROL_UUIDS
const BUFFERS = require('./buffers')

function StringsController(options) {
  this.options = options || {}
  this.service = new BluetoothService(SERVICES.STRINGS_CONTROL_UUID, options.timeout)
}

StringsController.prototype.turnOn = function () {
  return this.service.getPeripheral()
    .then((peripheral) => {
      return peripheral.writeToCharacteristic(CHARS.MAIN, [BUFFERS.HANDSHAKE, BUFFERS.ON])
    })
}

StringsController.prototype.turnOff = function () {
  return this.service.getPeripheral()
    .then((peripheral) => {
      return peripheral.writeToCharacteristic(CHARS.MAIN, [BUFFERS.HANDSHAKE, BUFFERS.OFF])
    })
}

StringsController.prototype.setTheme = function (theme) {
  return this.service.getPeripheral()
    .then((peripheral) => {
      return peripheral.writeToCharacteristic(CHARS.MAIN, [BUFFERS.HANDSHAKE, theme])
    })
}

StringsController.prototype.getThemeFromHex = function (hex) {
  const color = nearestColor(`#${hex}`) || {}

  if (color.name) {
    color.buffer = EFFECTS[`${color.name}-steady`]
    return color
  } else {
    throw new Error(`'color.name' is ${color.name}, invalid hex value for '${hex}'`)
  }
}

module.exports = StringsController
