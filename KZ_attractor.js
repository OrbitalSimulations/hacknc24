class Attractor {
    constructor(x, y, m) {
        this.pos = createVector(x, y);
        this.mass = m;
        this.r = sqrt(this.mass) * 10;
    }

    attract(mover) {
        let force = p5.Vector.sub(this.pos, mover.pos);
        let distanceSq = constrain(force.magSq(), 100, 1000);
        let G = 9.8;
        let strength = G * (this.mass * mover.mass) / distanceSq;
        force.setMag(strength);
        mover.applyForce(force);
    }

    show() {
        // Draw the glow effect
        noStroke();
        //fill(227, 180, 25, 50); // Slightly translucent glow color
        //ellipse(this.pos.x, this.pos.y, this.r * 3); // Larger ellipse for glow

        // Draw the main attractor
        fill("#E3B419");
        ellipse(this.pos.x, this.pos.y, this.r * 2);
    }
}