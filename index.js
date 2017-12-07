const version = require('./package').version
const BluetoothService = require('./lib/bluetooth-service')
const StringsController = require('./lib/strings/controller')
const effects = require('./lib/effects/effects')
const themes = require('./lib/effects/themes')

module.exports = {
  version,
  BluetoothService,
  StringsController,
  effects,
  themes
}
