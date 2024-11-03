let movers = [];
let attractor;

function setup() {
  current_preset = 'solar';
  createCanvas(windowWidth, windowHeight);
  background(0);

  // Initialize the movers with specific initial conditions
  initializeMovers();
//   if (current_preset === 'solar' || current_preset === 'sandbox') {
	
//   } else if (current_preset === 'twbody') {
// 	movers[0] = new Mover((width - 100)/2, height/2, 0, 5, 10);
// 	movers[1] = new Mover((width + 100)/2, height/2, 0, -5, 10);
//   } else {
// 	movers[0] = new Mover((width - 100)/2, height/2, 0, 5, 10);
// 	movers[1] = new Mover((width + 100)/2, height/2, 0, -5, 10);
// 	movers[2] = new Mover(width/2, height/2, 0, -0.02, 10);
//   }

  // Initialize attractor with a default mass
  let mass2 = parseFloat(document.getElementById('mass2').value); // Get mass from mass2 slider
  attractor = new Attractor(width / 2, height / 2, mass2);

  // Add event listeners for mass sliders
  setupMassSliders();

  // Add event listeners for adding and removing movers
  setupMoverButtons();

  // Add event listeners for preset buttons
  setupPresetButtons();
}

function draw() {
  background(0, 25); // Create a trail effect

  // Update and show all movers
  if (current_preset === 'twbody') {
	movers[0].attract(movers[1])
	movers[1].attract(movers[0])
	} else if (current_preset === 'thbody') {
	movers[0].attract(movers[1])
	movers[0].attract(movers[2])
	movers[1].attract(movers[0])
	movers[1].attract(movers[2])
	movers[2].attract(movers[0])
	movers[2].attract(movers[1])
  }
	for (let mover of movers) {
		mover.update();
		if (current_preset === 'solar' || current_preset === 'sandbox') {
			attractor.attract(mover);
		}
		mover.show();
	}
  
  if (current_preset === 'solar' || current_preset === 'sandbox') {
	attractor.show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Initialize movers with specific positions and velocities
function initializeMovers() {
  const initialConditions = [
    { x: width / 2 + 38.7 / 3, y: height / 2, vy: 0.84, color: [64, 63, 60] },
      { x: width / 2 + 72.3 / 3, y: height / 2, vy: 0.6, color: [145, 116, 26] },
      { x: width / 2 + 100 / 3, y: height / 2, vy: 0.5774, color: [20, 47, 199]  },
      { x: width / 2 + 152.4 / 3, y: height / 2, vy: 0.7159, color: [199, 20, 20]  },
      { x: width / 2 + 520.3 / 3, y: height / 2, vy: 1.3, color: [235, 139, 30]  },
      { x: width / 2 + 953.9 / 3, y: height / 2, vy: 1.76, color: [214, 192, 69]  },
      { x: width / 2 + 1918 / 3, y: height / 2, vy: 2.52, color: [46, 168, 217]  },
      { x: width / 2 + 3006 / 3, y: height / 2, vy: 3.14, color: [39, 85, 214]  },
  ];

  for (let condition of initialConditions) {
    let mass1 = parseFloat(document.getElementById('mass1').value); // Get mass from mass1 slider
    movers.push(new Mover(condition.x, condition.y, 0, condition.vy, mass1, condition.color));
  }
}

// Set up mass slider event listeners
function setupMassSliders() {
  const mass1Slider = document.getElementById('mass1');
  const mass2Slider = document.getElementById('mass2');

  mass1Slider.addEventListener('input', function() {
    document.getElementById('mass1Value').innerText = this.value; // Update displayed mass1 value
    let mass1 = parseFloat(this.value);
    // Update movers' mass dynamically
    for (let mover of movers) {
      mover.mass = mass1; // Update mass for each mover
    }
  });

  mass2Slider.addEventListener('input', function() {
    attractor.mass = parseFloat(this.value); // Update attractor mass dynamically
    attractor.r = sqrt(attractor.mass) * 10; // Update radius based on new mass
    document.getElementById('mass2Value').innerText = this.value; // Update displayed mass2 value
  });
}

// Set up event listeners for adding and removing movers
function setupMoverButtons() {
  const addMoverButton = document.getElementById('add');
  const removeMoverButton = document.getElementById('remove');

  addMoverButton.addEventListener('click', function() {
    let x = random(width);
    let y = random(height);
    let vx = random(-1, 1);
    let vy = random(-1, 1);
    let mass1 = parseFloat(document.getElementById('mass1').value); // Get mass from mass1 slider
    movers.push(new Mover(x, y, vx, vy, mass1));
  });

  removeMoverButton.addEventListener('click', function() {
    if (movers.length > 0) {
      movers.pop(); // Remove the last mover if there are any
    }
  });
}

// Set up event listeners for preset buttons
function setupPresetButtons() {
  const presets = {
    solar: [
      { x: width / 2 + 38.7 / 3, y: height / 2, vy: 0.84, color: [64, 63, 60] },
      { x: width / 2 + 72.3 / 3, y: height / 2, vy: 0.6, color: [145, 116, 26] },
      { x: width / 2 + 100 / 3, y: height / 2, vy: 0.5774, color: [20, 47, 199]  },
      { x: width / 2 + 152.4 / 3, y: height / 2, vy: 0.7159, color: [199, 20, 20]  },
      { x: width / 2 + 520.3 / 3, y: height / 2, vy: 1.3, color: [235, 139, 30]  },
      { x: width / 2 + 953.9 / 3, y: height / 2, vy: 1.76, color: [214, 192, 69]  },
      { x: width / 2 + 1918 / 3, y: height / 2, vy: 2.52, color: [46, 168, 217]  },
      { x: width / 2 + 3006 / 3, y: height / 2, vy: 3.14, color: [39, 85, 214]  },
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

  // Set up event listeners for each preset button
  for (const [presetName, presetMovers] of Object.entries(presets)) {
    document.getElementById(presetName).addEventListener('click', function () {
      // Clear current movers
      movers = [];
      // Initialize movers based on the preset
      presetMovers.forEach((condition) => {
        let mass1 = parseFloat(document.getElementById('mass1').value); // Get mass from mass1 slider
        movers.push(new Mover(condition.x, condition.y, 0, condition.vy, mass1, condition.color));
      });
      // Set the current preset to control attractor visibility
      current_preset = presetName;
    });
  }
}
