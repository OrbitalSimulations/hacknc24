class Mover {
    constructor(x, y, mass) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.vel.mult(5);
        this.acc = createVector(0, 0);
        this.mass = mass;
        this.r = sqrt(this.mass) * 2;
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acc.add(f);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    show() {
        fill(200);
        stroke(0);
        ellipse(this.pos.x, this.pos.y, this.mass, this.mass);
    }
}