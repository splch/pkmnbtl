// Place your const, vars, functions or classes here

Graphics.prototype.setFontPKMN = function (scale) {
  // Actual height 7 (7 - 1)
  this.setFontCustom(
    E.toString(require('heatshrink').decompress(atob('AAMwvt9mAFBuFwj1+vkQgt/qtQuEAiF4q18t0ahkCm95rs3g0NgFQsEAjkioNBgACBkUcE4N4D4MIn0MhEAhsOE4IAEgEGg0AgMCgkIiEgoEAjE8o1CsU8jEAgUiv1+gUCgEmt1OpVavUygEEo1SqVyt1MgEMjk0sgYBgkAulWB4NSr0MgE8vwHFsFgo1OrFwMwMsB4d+liSBvVKAAN+nkAs1mgFttxuBhkemR5BAAUAiUehgsBmAoBpdbVwMgWYM8t1eJoM4gcMmlEmkMgcAv9JAAU5RYKrDVQQPBAwg0BC4lJXwN/pAADUYIfCB4UuB4MIAAd/awQpCgEOFgV+oAdBv7aBjEkoUBA4MBAAgHBkEQjDZBEoIHChEEgwHBLohVDJokwB4lFk0dB4lMpUxgEyNokmgBKBoF/AYUAvkCIwY3BsEYg0Dg0YcQN/h0IJAMOOoVjikYiljO4NAK4MfL4InBoNDotJqNhUoSLCnEGSYUAA'))),
    32,
    atob("AgUDBAYHCAMFBQQFAwcDCAgHCAgICAgICAgDAwUFBQkHCAgICAgICAgGCAgICAgICAgICAgICAgICAgEAgQ="),
    8 + (scale << 8) + (1 << 16)
  );
  return this;
};

// Clear the screen
g.clear();

// Redraw the screen
function draw() {
  g.reset().clearRect(Bangle.appRect);

  // Use Pokemon font
  g.setFontPKMN(1);

  // Get and format date
  var date = new Date();
  var dayStr = require("locale").dow(date, 1).toUpperCase();
  var dayNum = date.getDate();
  var month = require("locale").month(date, 1).toUpperCase();
  var time = require("locale").time(date, 1); // Opponent's name
  var dateStr = dayStr + " " + dayNum + " " + month; // Player's name

  // Get and format storage space
  var spaceStr = require('Storage').getFree() / process.env.STORAGE; // Opponent's HP

  // Get and format battery level
  var battery = E.getBattery(); // 0-100
  var batteryStr = battery + "/100"; // Player's HP

  // Get and format RAM usage
  var memory = process.memory();
  var memoryStr = memory.usage / memory.total; // Experience points

  // Get and format temperature
  var temperature = E.getTemperature(); // Degrees (celsius)
  var temperatureStr = require("locale").temp(temperature); // Info box

  // Draw date
  var height = g.getFontHeight();
  g.drawString(time, 0, 0 * height);
  g.drawString(spaceStr, 0, 1 * height)
  g.drawString(dateStr, 0, 2 * height);
  g.drawString(batteryStr, 0, 3 * height);
  g.drawString(memoryStr, 0, 4 * height);
  g.drawString(temperatureStr, 0, 5 * height);
}

// First draw...
draw();

// Show launcher when middle button pressed
Bangle.setUI("clock");

// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();
