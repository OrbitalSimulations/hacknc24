let movers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  width = windowWidth;
  height = windowHeight;

  
  //Initialize the two celestial bodies
  movers[0] = new Mover((width - 100)/2, height/2, 0, 5, 10);
  movers[1] = new Mover((width + 100)/2, height/2, 0, -5, 10);
  movers[2] = new Mover(width/2, height/2, 0, -0.02, 10);
  

  /*
  for (let i = 0; i < 50; i++){
    let x = random(width/4, (3/4) * width);
    let y = random(height/4, (3/4) * height);
    let v = p5.Vector.random2D();
    let m = random(10, 25);
    movers[i] = new Mover(x, y, v.x, v.y, m)
  }
  */  

  //sun = new Mover(windowWidth/2, windowHeight/2, 0, 0, 100);
}

function draw() {
  background(0);  // Use a solid background color for clearer trails

  if (movers.length >= 2) {
    /*
    for (let mover of movers) {
      sun.attract(mover);
      for (let other of movers) {
        if (mover !== other) {
          mover.attract(other);
        }
      }
    }
    */
   movers[0].attract(movers[1])
   movers[0].attract(movers[2])
   movers[1].attract(movers[0])
   movers[1].attract(movers[2])
   movers[2].attract(movers[0])
   movers[2].attract(movers[1])
  }


  // Update and display each mover
  for (let mover of movers) {
      mover.update();
      mover.show();
  }
  //sun.show();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}