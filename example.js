const { Engine, Render, Runner, Bodies, World } = Matter;

// Create an engine
const engine = Engine.create();
const { world } = engine;

// Create a renderer
const render = Render.create({
  element: document.body,
  engine: engine
});

// Run the renderer
Render.run(render);

// Create a runner
const runner = Runner.create();
Runner.run(runner, engine);

// Add some bodies
const box = Bodies.rectangle(400, 200, 80, 80);
const ground = Bodies.rectangle(400, 600, 810, 60, { isStatic: true });

World.add(world, [box, ground]);
