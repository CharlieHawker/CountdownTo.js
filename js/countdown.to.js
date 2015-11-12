var CountdownTo = (function() {

  var defaults = {
    onCountdownBegin: function() {},
    onCountdownEnd: function() {},
    onCalculateRemainingTime: function() {},
    updateInterval: 500,
    indexTimeUnitNameMap: ['years', 'months', 'days', 'hours', 'minutes', 'seconds']
  };


  var CountdownTo = function(endTime, options) {
    options = ( options || {});
    this.options = defaults;
    for (var optionName in this.options ) {
      this.options[optionName] = ( options.hasOwnProperty(optionName) && options[optionName] !== undefined ) ? options[optionName] : defaults[optionName];
    }
    this.endTime = (new Date(endTime)).getTime();
    this.init();
  };


  CountdownTo.prototype.init = function() {
    var c = this;

    c.timeRemaining = Array(7).fill(0);
    c.calculateTimeRemaining();
    c.options.onCountdownBegin.call(c);
    c.refreshInterval = setInterval(function() {
      c.calculateTimeRemaining();
    }, c.options.updateInterval);
  };


  CountdownTo.prototype.calculateTimeRemaining = function() {
    var c = this,
        r = c.endTime - (new Date()).getTime();

    if ( r > 0 ) {
      c.timeRemaining = [
        Math.floor(r / (1000*60*60*24*365)), // years
        Math.floor((r%(1000*60*60*24*365)) / (1000*60*60*24*30)), // months
        Math.floor((r%(1000*60*60*24*30)) / (1000*60*60*24)), // days
        Math.floor((r%(1000*60*60*24)) / (1000*60*60)), // hours
        Math.floor((r%(1000*60*60)) / (1000*60)), // minutes
        Math.floor((r%(1000*60)) / 1000) // seconds
      ];

      c.options.onCalculateRemainingTime.call(c);
    } else {
      clearInterval(c.refreshInterval);
      c.timeRemaining = Array(7).fill(0);
      c.options.onCountdownEnd.call(c);
    }
  };


  CountdownTo.prototype.timeRemainingForDisplay = function() {
    var c = this,
        hasDisplayedSomething = false,
        strs = [];

    for (var i=0; i<c.timeRemaining.length; i++) {
      if ( c.timeRemaining[i] > 0 || hasDisplayedSomething ) {
        strs.push(c.timeRemaining[i] + ' ' + c.options.indexTimeUnitNameMap[i]);
        hasDisplayedSomething = true;
      }
    }

    return strs.join(' ');
  };

  return CountdownTo;
}());

if ( typeof module !== "undefined" )
  module.exports = CountdownTo;