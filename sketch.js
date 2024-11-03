let movers = [];
let attractor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  // Initialize movers with mass from the first slider
  for (let i = 0; i < 20; i++) {
      let x = random(width);
      let y = random(height);
      let mass1 = document.getElementById('mass1').value; // Get mass from mass1 slider
      movers[i] = new Mover(x, y, mass1);
  }

  // Initialize attractor with a default mass
  let mass2 = document.getElementById('mass2').value; // Get mass from mass2 slider
  attractor = new Attractor(width / 2, height / 2, mass2);

  // Add event listeners for the sliders to update the attractor mass and display values
  const mass1Slider = document.getElementById('mass1');
  const mass2Slider = document.getElementById('mass2');
  
  mass1Slider.addEventListener('input', function() {
      document.getElementById('mass1Value').innerText = this.value; // Update displayed mass1 value
      // Update movers' mass if desired
      for (let mover of movers) {
          mover.mass = this.value; // Update mass for each mover if needed
      }
  });

  mass2Slider.addEventListener('input', function() {
      attractor.mass = this.value; // Update attractor mass dynamically
      attractor.r = sqrt(attractor.mass) * 10; // Update radius based on new mass
      document.getElementById('mass2Value').innerText = this.value; // Update displayed mass2 value
  });

    // Add event listeners for the buttons to add and remove objects
    const addMoverButton = document.getElementById('add');
    const removeMoverButton = document.getElementById('remove');

    addMoverButton.addEventListener('click', function() {
        let x = random(width);
        let y = random(height);
        let mass1 = document.getElementById('mass1').value; // Get mass from mass1 slider
        movers.push(new Mover(x, y, mass1));
    });

    removeMoverButton.addEventListener('click', function() {
        movers.pop();
    });
}


function draw() {
    background(0, 25); // Length of trail

    for (let mover of movers) {
        mover.update();
        attractor.attract(mover);
        mover.show();
    }

    attractor.show();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
