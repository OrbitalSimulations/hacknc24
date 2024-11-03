let movers = [];
let distance = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  // Initialize movers with random positions and velocities
  movers[0] = new Mover((width - 100)/2, height/2, 0, 5, 10);
  movers[1] = new Mover((width + 100)/2, height/2, 0, -5, 10);


  // n-body generalization
  /*
  for (let i = 0; i < 10; i++) {
    let x = random(width / 4, (3 / 4) * width);
    let y = random(height / 4, (3 / 4) * height);
    let v = p5.Vector.random2D();
    let m = 10;
    movers[i] = new Mover(x, y, v.x, v.y, m);
  }
  */
}

function draw() {
  background(0);

  for (let mover of movers){
    for (let other of movers){
      if (mover !== other){
        drawDottedLine(mover.pos, other.pos, 5, 3); 
        distance = p5.Vector.dist(mover.pos, other.pos);
        console.log(distance);
        mover.attract(other);
        stroke(255);
      }
    }
  }
  /* Draw dotted lines between all pairs of movers
  if (movers.length >= 2) {
    for (let i = 0; i < movers.length; i++) {
      for (let j = i + 1; j < movers.length; j++) {
        let mover = movers[i];
        let other = movers[j];
        stroke(255);
        drawDottedLine(mover.pos, other.pos, 5, 3);
      }
    }
  }*/

  // Update and display each mover
  for (let mover of movers) {
    mover.update();
    mover.show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Function to draw a dotted line between two p5.Vector points
function drawDottedLine(start, end, segmentLength, gapLength) {
  let distance = p5.Vector.dist(start, end);
  let direction = p5.Vector.sub(end, start).normalize();
  
  for (let d = 0; d < distance; d += segmentLength + gapLength) {
    let segmentStart = p5.Vector.add(start, p5.Vector.mult(direction, d));
    let segmentEnd = p5.Vector.add(start, p5.Vector.mult(direction, min(d + segmentLength, distance)));
    line(segmentStart.x, segmentStart.y, segmentEnd.x, segmentEnd.y);
  }
}
