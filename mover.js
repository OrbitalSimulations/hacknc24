class Mover {
    constructor(x, y, vx, vy, mass) {
        this.pos = createVector(x, y);
        this.vel = createVector(vx, vy);
        this.acc = createVector(0, 0);
        this.mass = mass;
        this.r = sqrt(this.mass) * 2;

        this.history = [];
        this.maxHistory = 10;  // Short history length for a brief trail
    }

    applyForce(force) {
        const slowMotionFactor = 1;
        let f = p5.Vector.div(force, this.mass).mult(slowMotionFactor);
        this.acc.add(f);
    }

    // attract(mover) {
    //     let force = p5.Vector.sub(this.pos, mover.pos);
    //     let distanceSq = constrain(force.magSq(), 100, 1000);
    //     let G = 5;
    //     let strength = G * (this.mass * mover.mass) / distanceSq;

    //     force.setMag(strength * 0.1);
    //     mover.applyForce(force);
    // }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

        this.history.push(this.pos.copy());
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }
    }

    show() {
        // Draw each point in the history with reduced opacity for motion blur effect
        for (let i = 0; i < this.history.length; i++) {
            let pos = this.history[i];
            let trailSize = map(i, 0, this.history.length, this.r * 0.1, this.r);
            let opacity = map(i, 0, this.history.length, 10, 25);  // Lower opacity

            fill(4, 217, 255, opacity);
            noStroke();
            ellipse(pos.x, pos.y, trailSize, trailSize);
        }

        // Draw the main mover with reduced opacity
        fill(4, 217, 255, 225);  // Main mover opacity reduced to 75 (out of 255)
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }
}