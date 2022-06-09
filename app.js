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

var bg = {
  width: 176, height: 176, bpp: 1,
  transparent: -1,
  buffer: require("heatshrink").decompress(atob("2GwgP/AH4A/AH4A/AH4AM/gVU+grrv4rUn6Am+4VU84VV58P8EAAAgVM5UP4AVS4ULwAVFT5YVBFY4VM5V7K6aZrCr0/CqkPCpXjBJEHCpXwSwqwO/AVUAH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/ACf+v4VT/QVUFdkfTP4AE84VhyEf4EAAAcBCptfwAVEgAVMwEfCqeQv5BFCpqDrCuHfCqm/Cql/Cqf+K6n9Cqn7Cqn3YvfwCqngBJHHCpWAgAAHg6/KChEAj5tUAH4AD94IH773LTZGPCpXzRo8DgiZJAAMBVw8DaBd9Do0C/QqK32wII80CpUN5o1HxZBK2fTBI+HCpXL14JHl4VUt4V/Cv4VwgHA+FvyEP/F+p4VLn9/+/v9+e//5v2PCpcfCoPfCoX4v/vCpcPCqkHgf37lgjxBB6/fCpgrF/fX7YVONof/5/LNpqZC7wIB6/TTJgIGIJrxsCv4V/CrODwFAt/f//4h/6/oVL9/37/nj///P3/V9Cp3qz4VDzoVN4HtCoJBS94rC7/6+oVS536+IVL84VF996/KZMK4KZCNoOCK5UvYpfTBI+XCpfPBI+LCpXz0EAAAsDkgIGAAcJgIfHgYrKwAVH/wVM3BBHuhBKju2Co+uCpVtQZC/BQZQLKAH4A/AH4A/ACQA="))
};

// Redraw the screen
function draw() {
  // for catching any error
  try {
    g.reset().clearRect(Bangle.appRect);

    // Draw battle scene background
    g.drawImage(bg, 0, 0);

    // Use Pokemon font
    g.setFontPKMN(1);

    // Set font color to black
    g.setColor(0x0000);

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
    g.drawString(time, 0, 3 * height); // Widgets are 8*3=24px tall
    g.drawString(spaceStr, 0, 4 * height);
    g.drawString(dateStr, 0, 5 * height);
    g.drawString(batteryStr, 0, 6 * height);
    g.drawString(memoryStr, 0, 7 * height);
    g.drawString(temperatureStr, 0, 8 * height);

    // Log potential bug roots
    console.log({
      "date": date,
      "memory": memory,
    });

    // Queue draw in one minute
    queueDraw();
  } catch (err) {
    // Report errors
    console.log(err);
  }
}

// Timeout used to update every minute
var drawTimeout;

// Schedule a draw for the next minute
function queueDraw() {
  if (drawTimeout) clearTimeout(drawTimeout);
  drawTimeout = setTimeout(function () {
    drawTimeout = undefined;
    draw();
  }, 60000 - (Date.now() % 60000));
}

// Clear the screen
g.clear();

// First draw...
draw();

// Stop updates when LCD is off, restart when on
Bangle.on('lcdPower', on => {
  if (on) {
    draw(); // Draw immediately, queue redraw
  } else { // Stop draw timer
    if (drawTimeout) clearTimeout(drawTimeout);
    drawTimeout = undefined;
  }
});

// Show launcher when middle button pressed
Bangle.setUI("clock");

// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();
