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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
