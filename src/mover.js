class Mover {
    constructor(x, y, vx, vy, mass, color=[4, 217, 255]) {
        this.pos = createVector(x, y);
        this.vel = createVector(vx, vy);
        this.acc = createVector(0, 0);
        this.mass = mass;
        this.r = sqrt(this.mass) * 2;
        this.color = color

        this.history = [];
        this.solarhistory = []
        this.maxHistory = 10;
    }

    applyForce(force) {
        const slowMotionFactor = 1;
        let f = p5.Vector.div(force, this.mass).mult(slowMotionFactor);
        this.acc.add(f);
    }

    attract(mover) {
        let force = p5.Vector.sub(this.pos, mover.pos);
        let distanceSq = constrain(force.magSq(), 100, 1000);
        let G = 9.8;
        let strength = G * (this.mass * mover.mass) / distanceSq;

        force.setMag(strength);
        mover.applyForce(force);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

        this.history.push(this.pos.copy());
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }
        this.solarhistory.push(this.pos.copy());
    }

    show(solar) {
        for (let i = 0; i < this.history.length; i++) {
            let pos = this.history[i];
            let trailSize = map(i, 0, this.history.length, this.r * 0.1, this.r);
            let opacity = map(i, 0, this.history.length, 10, 25);

            fill(this.color[0], this.color[1], this.color[2], opacity);
            noStroke();
            ellipse(pos.x, pos.y, trailSize, trailSize);
        }

        fill(this.color[0], this.color[1], this.color[2], 225);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.r, this.r);

        if (solar === 'solar') {
			stroke(247, 247, 247, 25); // White color with slight transparency
			noFill();
			beginShape();
			for (let v of this.solarhistory) {
				vertex(v.x, v.y);
			}
			endShape();
		}
    }
}