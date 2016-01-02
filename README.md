# record-schedule - Record audio on a recurring schedule and post to a server using SoX and LAME
[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-url]][daviddm-image]

record-schedule is a CLI to run a background service that will:
 1. Automatically record audio on a recurring schedule using the [`sox`][sox] CLI
 2. Convert the audio to MP3 using the [`lame`][lame] CLI
 3. Post MP3 to a remote server

## Installation
 * Requires [Node.js][node-js] to be installed. You'll typically find this
available in your OS package manager.
 * Requires the [`sox`][sox] and [`lame`][lame] CLI to be installed.
 * `npm install -g record-schedule` (You may need to run this under `sudo`.)
 
### Configuration
To locate your config.js file run:
```sh
$ record-schedule config
```
The config variables are:

```js
config.minutesToRecord =  10;
config.recurrance.hour = 15;
config.recurrance.minute = 30;
config.recurrance.second = 0;
config.recurrance.dayOfWeek = 5;
config.server.url =  '<url>';
// Optional Parameters
config.params.foo = 'bar';
```
### Recurrance
 * Accepts the [Recurrence Rule Scheduling][recurrence-rule] formating from [node-schedule] [node-schedule].

## Running
 * Run as a background service (creating OSX daemons [requires sudo/root][node-mac] privileges)
```sh
$ sudo record-schedule start
```
 * To stop scheduled recordings
```sh
$ sudo record-schedule stop
```

   [sox]: http://sox.sourceforge.net/
   [lame]: http://lame.sourceforge.net/
   [recurrence-rule]: https://github.com/node-schedule/node-schedule/blob/master/README.md#recurrence-rule-scheduling
   [node-js]: http://nodejs.org/
   [node-schedule]: https://www.npmjs.com/package/node-schedule
   [node-mac]: https://github.com/coreybutler/node-mac
   [npm-url]: https://npmjs.org/package/record-schedule
   [npm-image]: https://badge.fury.io/js/record-schedule.svg
   [daviddm-url]: https://david-dm.org/adriancarriger/record-schedule.svg?theme=shields.io
   [daviddm-image]: https://david-dm.org/adriancarriger/record-schedule