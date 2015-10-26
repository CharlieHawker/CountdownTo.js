var assert = require('assert');
    CountdownTo = require('../index'),
    t = (new Date()).getTime() + (1000 * 3600 * 24); // Tomorrow;

describe('CountdownTo', function() {
  describe('#constructor()', function () {
    it('should contain default options', function () {
      var c = new CountdownTo(t);
      assert.equal(500, c.options.updateInterval);
    });
    it('should override default options', function () {
      var c = new CountdownTo(t, { updateInterval: 850 });
      assert.equal(850, c.options.updateInterval);
    });
  });

  describe('#init()', function () {
    it('should set up the updateInterval', function() {
      var c = new CountdownTo(t);
      setTimeout(function() {
        assert.equal("number", typeof c.refreshInterval);
      }, 500);
    });

    it('should apply the `onCountdownBegin` callback', function() {
      var callbackCalled = false,
          c = new CountdownTo(t, { onCountdownBegin: function() { callbackCalled = true }});
      assert.equal(true, callbackCalled);
    });
  });

  describe('#calculateTimeRemaining()', function() {
    it('should apply the `onCalculateRemainingTime` callback', function() {
      var callbackCalled = false,
          c = new CountdownTo(t, { onCalculateRemainingTime: function() { callbackCalled = true; }});

      setTimeout(function() {
        assert.equal(true, callbackCalled);
      }, 750);
    });

    it('should correctly calculate remaining time', function() {
      var c = new CountdownTo(t);
      assert.equal(23, c.timeRemaining[3]);
      assert.equal(59, c.timeRemaining[4]);
    });

    it('should apply the `onCountdownEnd` callback', function() {
      var callbackCalled = false,
          u = (new Date()).getTime() + 750,
          c = new CountdownTo(u, { onCountdownEnd: function() { callbackCalled = true; }});

      setTimeout(function() {
        assert.equal(true, callbackCalled);
      }, 1500);
    });
  });

  describe('#timeRemainingForDisplay()', function() {
    it('should return a string', function() {
      var c = new CountdownTo(t);
      assert.equal("string", typeof c.timeRemainingForDisplay());
    });

    it('should correctly display remaining time', function() {
      var c = new CountdownTo(t);
      assert.equal('23 hours 59 minutes', c.timeRemainingForDisplay().substring(0, 19));
    });
  });
});