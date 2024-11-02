// Module aliases
const { Engine, Render, Runner, Bodies, Composite, Body, Mouse, MouseConstraint, Events } = Matter;

// Create an engine
const engine = Engine.create();
engine.world.gravity.y = 0;  // Disable default gravity

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
    },
    mass: 1.98 * 10 ** 30 // Mass of the Sun
});

// Define a scale factor (1 AU = 100 pixels)
const scaleFactor = 100; // Scale: 1 AU to pixels

// Create orbiting bodies (e.g., planets)
const orbitingBodies = [];

const gravitationalConstant = 6.67430 * 10 ** (-11); // m^3 kg^-1 s^-2
const massEarth = 5.972 * 10 ** 24; // Mass of the Earth in kg

// Define distances in AU (e.g., distances of planets from the Sun)
const distancesAU = [1, 1.524, 5.204, 9.581, 19.181]; // Distances of Mercury, Venus, Jupiter, Saturn, Uranus in AU

for (let i = 0; i < distancesAU.length; i++) {
    const distanceInPixels = distancesAU[i] * scaleFactor; // Scale distance to pixels
    const orbitingBody = Bodies.circle(window.innerWidth / 2 + distanceInPixels, window.innerHeight / 2, 20, {
        render: {
            fillStyle: 'blue'
        }
    });
    
    // Calculate initial tangential velocity for a circular orbit using gravitational constant
    const distanceInMeters = distancesAU[i] * 1.496 * 10 ** 11; // Convert AU to meters
    const initialVelocity = Math.sqrt(gravitationalConstant * centralBody.mass / distanceInMeters); // Using meters for calculations
    console.log(initialVelocity);

    Body.setVelocity(orbitingBody, { x: 0, y: initialVelocity });

    orbitingBodies.push(orbitingBody);
}

// Add all bodies to the world
Composite.add(engine.world, [centralBody, ...orbitingBodies]);

// Apply gravitational forces to simulate orbiting
Events.on(engine, 'beforeUpdate', function() {
    orbitingBodies.forEach(body => {
        const dx = body.position.x - centralBody.position.x;
        const dy = body.position.y - centralBody.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Calculate gravitational force magnitude
        const forceMagnitude = gravitationalConstant * centralBody.mass * massEarth / ((dist * (1.496 * 10 ** 11 / scaleFactor)) ** 2); // Convert distance to meters for calculations
        
        // Check if distance is not zero to avoid division by zero
        if (dist > 0) {
            // Calculate the force vector based on the angle
            const angle = Math.atan2(dy, dx);
            Body.applyForce(body, body.position, {
                x: -forceMagnitude * Math.cos(angle),
                y: -forceMagnitude * Math.sin(angle)
            });
        }
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
