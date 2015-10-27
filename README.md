[![Build Status](https://travis-ci.org/CharlieHawker/CountdownTo.js.svg?branch=master)](https://travis-ci.org/CharlieHawker/CountdownTo.js) [![npm version](https://badge.fury.io/js/countdown.to.svg)](https://badge.fury.io/js/countdown.to)

# CountdownTo.js

This is a simple vanilla javascript-based countdown timer.

*N.B.* Not designed for anything other than simple displays, as it makes assumptions (365 days / year, 30 days / month, no leap year handling...)!

## Installation

```
npm install countdown.to --save
```


## Usage

To create a new countdown timer targeting a specific date:
```
// Require the module
var CountdownTo = require('countdown.to');
// Create a new timer
var timer = new CountdownTo('2015-12-25 00:00:00');
```

To update the display when the time remaining is recalculated:
```
var timer = new CountdownTo('2015-12-25 00:00:00', { onCalculateRemainingTime: function() {
  var c = this;
  document.getElementById('myTimerDiv').innerHTML = c.timeRemainingForDisplay();
});
```

Other API & options described below.


## API & Options

### `onCountdownBegin`
Callback function called when countdown timer initialises.

### `onCountdownEnd`
Callback function called when countdown timer reaches 0.

### `onCalculateRemainingTime`
Callback function called when the remaining time is recalculated.

### `updateInterval`
Interval in milliseconds at which remaining time is recalculated (default: 500)

### `indexTimeUnitNameMap`
The display units for each time unit that is calculated (default: `['years', 'months', 'days', 'hours', 'minutes', 'seconds']`)

## Tests

`npm test`