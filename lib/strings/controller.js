const BluetoothService = require('../bluetooth-service')

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

module.exports = StringsController
