
let a = 0;

function setup() {
  createCanvas(400, 300);
}

function draw() {
  clear();
  const w = map(sin(a), -1, 1, 0, 300);
  fill(255, 0, 100);
  rect(10, 10, w, 20);
  a += 0.05;
}