const noble = require('noble')

function Service (service_uuid, timeout) {
  console.log(`Initializing device(s) with service '${service_uuid}'`)

  this.uuid = service_uuid
  this.timeout = timeout || 10 * 1000
  this.state = 'unknown'
  this.peripheral = null
  this.peripheral_name = null

  noble.on('stateChange', (state) => {
    this.state = state

    console.log(`State changed to '${state}'`)

    if (state === 'poweredOn') {
      console.log(`Scanning for service '${this.uuid}'`)
      noble.startScanning([this.uuid], false)
    } else {
      console.log('Stop scanning...')
      noble.stopScanning()
    }
  })

  noble.on('discover', (peripheral) => {
    // found a peripheral, stop scanning
    noble.stopScanning()

    this.connected = false
    this.peripheral = peripheral
    this.peripheral_name = peripheral.advertisement.localName

    console.log(`Found peripheral '${this.peripheral_name}'`)

    peripheral.once('connect', () => {
      this.connected = true
      console.log(`Connected to '${this.peripheral_name}'`)
    })

    peripheral.once('disconnect', () => {
      this.connected = false
      console.log(`Disconnected from '${this.peripheral_name}'`)
    })
  })
}

Service.prototype.getPeripheral = function () {
  return new Promise((resolve, reject) => {
    if (!this.connected) {
      if (!this.peripheral) reject(`Unable to get peripheral, make sure it is not already connected elsewhere`)
      this.peripheral.connect((err) => {
        if (err) reject(`Error occured while connecting: ${err}`)
        else resolve(this)
        setTimeout(() => { this.peripheral.disconnect((err) => console.error) }, this.timeout)
      })
    } else {
      resolve(this)
    }
  })
}

Service.prototype.writeToCharacteristic = function (characteristic_uuid, values) {
  return new Promise((resolve, reject) => {
    this.peripheral.discoverSomeServicesAndCharacteristics([this.uuid], [characteristic_uuid], (error, services, characteristics) => {
      console.log(`Writing values: ${JSON.stringify(values)}`)
      for (const value of values) {
        characteristics[0].write(value, false, (error) => {
          if (error) reject({ error: `Error writing ${value} to ${characteristics[0].uuid}` })
        })
      }

      resolve({ success: `Values written to characteristic '${characteristics[0].uuid}'` })
    })
  })
}

module.exports = Service
