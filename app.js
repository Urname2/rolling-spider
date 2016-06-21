var keypress = require('keypress');
var colors = require('colors');
var Cylon = require("cylon");

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

//drone variables
var speed = 25;
var steps = 15;

Cylon.robot({
	connections: {
		/*
		 * Remember to change the uuid to your own devices uuid
		 */
		spider: { adaptor: "rolling-spider", uuid: "e01440fc3d84" }
	},

	devices: {
		drone: { driver: "rolling-spider" }
	},

	work: function (my) {
		
		setInterval(function(){
			console.log("battery level: ".yellow, my.drone.getBatteryLevel())
		}, 1000);

		process.stdin.on('keypress', function (ch, key) {
			
			//console.log('key pressed', key);
			
			//tak off if page up is pressed
			if(key && key.name == 'pageup'){
				console.log('drone fly!!'.red);
				my.drone.wheelOn();
				my.drone.flatTrim();
				my.drone.takeOff();
			}
			
			//land if pagedown
			if(key && key.name == 'pagedown'){
				my.drone.land();
				after(1500, function () {
					Cylon.halt();
				});
			}
			
			if(key && key.name == 'x'){
				my.drone.land();
				process.exit();
			}
		});
		
	}
}).start();



