// Module aliases
const { Engine, Render, Runner, Bodies, Composite, Body } = Matter;

// Create an engine
const engine = Engine.create();

// Create a renderer
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: '#000'
    }
});

Render.run(render);

// Create a runner
const runner = Runner.create();
Runner.run(runner, engine);

// Create central body (e.g., a star)
const centralBody = Bodies.circle(window.innerWidth / 2, window.innerHeight / 2, 50, {
    isStatic: true,
    render: {
        fillStyle: 'yellow'
    }
});

// Create orbiting bodies (e.g., planets)
const orbitingBodies = [];
for (let i = 0; i < 5; i++) {
    const orbitingBody = Bodies.circle(window.innerWidth / 2 + (i + 1) * 100, window.innerHeight / 2, 20, {
        render: {
            fillStyle: 'blue'
        }
    });
    
    // Calculate initial tangential velocity for stable orbit
    const distance = Math.sqrt(Math.pow(orbitingBody.position.x - centralBody.position.x, 2) +
                               Math.pow(orbitingBody.position.y - centralBody.position.y, 2));
    const velocityMagnitude = Math.sqrt(0.001 * centralBody.mass / distance);
    
    // Perpendicular velocity (90 degrees to the gravitational force direction)
    const angle = Math.atan2(orbitingBody.position.y - centralBody.position.y, orbitingBody.position.x - centralBody.position.x);
    Body.setVelocity(orbitingBody, {
        x: -velocityMagnitude * Math.cos(angle),
        y: velocityMagnitude * Math.sin(angle)
    });

    orbitingBodies.push(orbitingBody);
}

// Add all bodies to the world
Composite.add(engine.world, [centralBody, ...orbitingBodies]);

// Apply gravitational forces to simulate orbiting
Matter.Events.on(engine, 'beforeUpdate', function() {
    orbitingBodies.forEach(body => {
        const dist = Math.sqrt(Math.pow(body.position.x - centralBody.position.x, 2) + Math.pow(body.position.y - centralBody.position.y, 2));
        const forceMagnitude = 0.001 * body.mass / (dist * dist); // Adjust force based on distance for stability
        const angle = Math.atan2(body.position.y - centralBody.position.y, body.position.x - centralBody.position.x);
        
        Body.applyForce(body, body.position, {
            x: -forceMagnitude * Math.cos(angle),
            y: -forceMagnitude * Math.sin(angle)
        });
    });
});

// Fit the render viewport to the scene
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: window.innerWidth, y: window.innerHeight }
});

// Handle window resize
window.addEventListener('resize', () => {
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: window.innerWidth, y: window.innerHeight }
    });
});
