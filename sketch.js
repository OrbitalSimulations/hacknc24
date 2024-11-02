let movers = [];
let attractor;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    for (let i = 0; i < 20; i++) {
        let x = random(width);
        let y = random(height);

        //TODO: Mass Slider
        let m = 10

        movers[i] = new Mover(x, y, m);
    }
    attractor = new Attractor(width/2, height/2, 10);
}

function draw() {
    background(0, 25); //length of trail

    for (let mover of movers) {
        mover.update(); 
        attractor.attract(mover);
        mover.show();
    }

    attractor.show();
}





















/*let movers = [];
let attractors = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < 10; i++) {
        let x = random(width);
        let y = random(height);
        let m = 50;
        movers[i] = new Mover(x, y, m);
    }
    let a = new Attractor(300, 300, 100, 5);
    attractors.push(a);
    background(0);
}

function mousePressed() {
  let a = new Attractor(mouseX, mouseY, 5);
  attractors.push(a);
}

function keyPressed() {
  let a = new Attractor(mouseX, mouseY, -5);
  attractors.push(a);
}

function draw() {
  background(0);
  for (let mover of movers) {
    mover.update();
    mover.show();
    for (let attractor of attractors) {
      attractor.attract(mover);
    }
  }
  for (let attractor of attractors) {
    attractor.show();
  }
}

// Resize the canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}*/
