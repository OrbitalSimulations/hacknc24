let movers = [];
let attractor;

function setup() {
	current_preset = 'solar';
 	createCanvas(windowWidth, windowHeight);
	background(0);

	initializeMovers();

	let mass2 = parseFloat(document.getElementById('mass2').value);
	attractor = new Attractor(width / 2, height / 2, mass2);

	setupMassSliders();
	setupMoverButtons();
	setupPresetButtons();
}

function draw() {
	background(0, 25);
	
	// Toggle visibility of distanceInfo based on current preset
	let distanceInfo = document.getElementById('distanceInfo');
	if (current_preset === 'twbody') {
		distanceInfo.style.display = 'block';

		// Calculate and display the distance between the two bodies
		let distance = p5.Vector.dist(movers[0].pos, movers[1].pos);
		document.getElementById('distanceValue').innerText = distance.toFixed(2);
	} else {
		distanceInfo.style.display = 'none';
	}

	if (current_preset === 'twbody') {
		background(0);
		for (let mover of movers) {
			for (let other of movers) {
				if (mover !== other) {
					drawDottedLine(mover.pos, other.pos, 5, 3);
					mover.attract(other);
				}
			}
		}
	} else if (current_preset === 'thbody') {
		// Attraction between three bodies
		movers[0].attract(movers[1]);
		movers[0].attract(movers[2]);
		movers[1].attract(movers[0]);
		movers[1].attract(movers[2]);
		movers[2].attract(movers[0]);
		movers[2].attract(movers[1]);
	} else if (current_preset === 'solar') {
		// draw white orbit trails
		
	}

	for (let mover of movers) {
		mover.update();
		if (current_preset === 'solar' || current_preset === 'sandbox') {
			attractor.attract(mover);
		}
		if (current_preset === 'solar') {
			mover.show('solar')
		} else {
			mover.show();
		}
	}

	if (current_preset === 'solar' || current_preset === 'sandbox') {
		attractor.show();
	}
}


function drawDottedLine(start, end, segmentLength, gapLength) {
	let distance = p5.Vector.dist(start, end);
	let direction = p5.Vector.sub(end, start).normalize();
	
	for (let d = 0; d < distance; d += segmentLength + gapLength) {
	  let segmentStart = p5.Vector.add(start, p5.Vector.mult(direction, d));
	  let segmentEnd = p5.Vector.add(start, p5.Vector.mult(direction, min(d + segmentLength, distance)));
	  line(segmentStart.x, segmentStart.y, segmentEnd.x, segmentEnd.y);
	}
  }
  

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function initializeMovers() {
	const initialConditions = [
		{ x: width / 2 + 38.7 / 3, y: height / 2, vy: 0.84, color: [64, 63, 60] },
		{ x: width / 2 + 72.3 / 3, y: height / 2, vy: 0.6, color: [145, 116, 26] },
		{ x: width / 2 + 100 / 3, y: height / 2, vy: 0.5774, color: [20, 47, 199] },
		{ x: width / 2 + 152.4 / 3, y: height / 2, vy: 0.71555, color: [199, 20, 20] },
		{ x: width / 2 + 520.3 / 3, y: height / 2, vy: 1.305, color: [235, 139, 30] },
		{ x: width / 2 + 953.9 / 3, y: height / 2, vy: 1.7665, color: [214, 192, 69] },
		{ x: width / 2 + 1918 / 3, y: height / 2, vy: 2.5115, color: [46, 168, 217] },
		{ x: width / 2 + 3006 / 3, y: height / 2, vy: 3.138, color: [39, 85, 214] },
    ];

  	for (let condition of initialConditions) {
		let mass1 = parseFloat(document.getElementById('mass1').value);
		movers.push(new Mover(condition.x, condition.y, 0, condition.vy, mass1, condition.color));
  	}
}

// Set up mass slider event listeners
function setupMassSliders() {
	const mass1Slider = document.getElementById('mass1');
	const mass2Slider = document.getElementById('mass2');

	mass1Slider.addEventListener('input', function() {
		document.getElementById('mass1Value').innerText = this.value;
		let mass1 = parseFloat(this.value);
		for (let mover of movers) {
			mover.mass = mass1;
		}
	});

  	mass2Slider.addEventListener('input', function() {
		attractor.mass = parseFloat(this.value);
		attractor.r = sqrt(attractor.mass) * 10;
		document.getElementById('mass2Value').innerText = this.value;
  });
}

function setupMoverButtons() {
	const addMoverButton = document.getElementById('add');
	const removeMoverButton = document.getElementById('remove');

	addMoverButton.addEventListener('click', function() {
		let x = random(width);
		let y = random(height);
		let vx = random(-1, 1);
		let vy = random(-1, 1);
		let mass1 = parseFloat(document.getElementById('mass1').value);
		movers.push(new Mover(x, y, vx, vy, mass1));
	});

	removeMoverButton.addEventListener('click', function() {
		if (movers.length > 0) {
		movers.pop();
		}
	});
}

function setupPresetButtons() {
	const presets = {
		solar: [
			{ x: width / 2 + 38.7 / 3, y: height / 2, vy: 0.84, color: [64, 63, 60] },
			{ x: width / 2 + 72.3 / 3, y: height / 2, vy: 0.6, color: [145, 116, 26] },
			{ x: width / 2 + 100 / 3, y: height / 2, vy: 0.5774, color: [20, 47, 199] },
			{ x: width / 2 + 152.4 / 3, y: height / 2, vy: 0.71555, color: [199, 20, 20] },
			{ x: width / 2 + 520.3 / 3, y: height / 2, vy: 1.305, color: [235, 139, 30] },
			{ x: width / 2 + 953.9 / 3, y: height / 2, vy: 1.7665, color: [214, 192, 69] },
			{ x: width / 2 + 1918 / 3, y: height / 2, vy: 2.5115, color: [46, 168, 217] },
			{ x: width / 2 + 3006 / 3, y: height / 2, vy: 3.138, color: [39, 85, 214] },
		],
		twbody: [
			{ x: width / 2 + 100, y: height / 2, vy: -2 },
			{ x: width / 2 - 100, y: height / 2, vy: 2 },
		],
		thbody: [
			{ x: width / 2, y: height / 2, vy: -0.1 },
			{ x: width / 2 + 100, y: height / 2, vy: -2.5 },
			{ x: width / 2 - 100, y: height / 2, vy: 2.5 },
		],
		sandbox: Array.from({ length: 20 }, () => ({
			x: random(width),
			y: random(height),
			vy: random(-2, 2),
		})),
	};

	for (const [presetName, presetMovers] of Object.entries(presets)) {
		document.getElementById(presetName).addEventListener('click', function () {
		movers = [];
		presetMovers.forEach((condition) => {
			let mass1 = parseFloat(document.getElementById('mass1').value);
			movers.push(new Mover(condition.x, condition.y, 0, condition.vy, mass1, condition.color));
		});
		current_preset = presetName;
		});
	}
}
