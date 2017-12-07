# NodeJS AppLights™ SDK

_Unofficial_ SDK for controlling Gimmy AppLights™ bluetooth devices.


## Dependencies

  - NodeJS 8.x
  - [Noble](https://github.com/sandeepmistry/noble)

  > Note: This project is using a [fork](https://github.com/PolideaInternal/noble/tree/macos_highsierra) of Noble which includes fixes specific to macOS High Sierra. See this [pull request](https://github.com/sandeepmistry/noble/pull/689) for details.


## Supported Products

There is only one product supported so far, but pull requests are welcomed :)

  - AppLights™ 24 Multi-Color LED-M5 (24LGT-M5)


## Supported features

  - On / Off control
  - Changing [some effects](lib/effects)


## Usage

```javascript
const sdk = require('applights-sdk')

let controller = new sdk.StringsController(opts)

// Turn on the lights
controller.turnOn().then(res).catch(err)

// Turn off the lights
controller.turnOff().then(res).catch(err)

// Apply a theme, see ./lib/effects folder
controller.setTheme(theme).then(res).catch(err)
```

## Todo

  - [ ] Support multiple devices
  - [ ] Unit tests
  - [ ] Query for currently used theme
  - [ ] Add missing effects


## Legal

<sub>The names "AppLights™ and LightShow™" are trademarks of [Gemmy Industries](http://www.gemmy.com/).

<sub>This project is in no way affiliated with, authorized, maintained, sponsored or endorsed by Gemmy Industries or any of its affiliates or subsidiaries.

<sub>I, the project owner and creator, am not responsible for any legalities that may arise in the use of this project. Use at your own risk.
