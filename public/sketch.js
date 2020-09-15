let trains = [10, 40, 50];

function setup() {
  createCanvas(500, 600);
}

function draw() {
  clear();
  for (let [index, train] of trains.entries()) {
    for (let i = 0; i < train; i += 10) {
      textSize(50);
      text("🚂", i * 5, (index + 1) * 100);
    }
  }

  if (random(1) > 0.9) trains[floor(random(trains.length))] = random(100);
}
