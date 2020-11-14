const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const NUMBER = 100;
const SPEED = 2;
const DIST = 75;

const points = [];

for (let i = 0; i < NUMBER; i++) {
  let point = {
    x: getRandom(0, canvas.width),
    y: getRandom(0, canvas.height),
    angle: getRandom(0, Math.PI * 2),
  }
  points.push(point);
}

tick();

function tick() {
  drawBackground();
  drawPoints();
  movePoints();
  drawLines();
  requestAnimationFrame(tick);
}

function drawBackground() {
  context.fillStyle = '#e35840';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPoints() {
  for (let point of points) {
    context.beginPath();
    context.fillStyle = 'white';
    context.arc(point.x, point.y, 2, 0, Math.PI * 2);
    context.fill();
  }
}

function getRandom(min, max) {
  return min + Math.random() * (max - min + 1);
}

function movePoints() {
  for (let point of points) {
    point.x = point.x + SPEED * Math.cos(point.angle);
    point.y = point.y + SPEED * Math.sin(point.angle);

    if (point.x < 0) {
      point.x = canvas.width + point.x;
    }
    if (point.x > canvas.width) {
      point.x = point.x - canvas.width;
    }
    if (point.y < 0) {
      point.y = canvas.height + point.y;
    }
    if (point.y > canvas.height) {
      point.y = point.y - canvas.height;
    }
  }
}

function getDist(a, b) {
  return ((a.x - b.x) ** 2 + (a.y - b.y) ** 2) ** 0.5;
}

function drawLines() {
  for (let i = 0; i < NUMBER - 1; i++) {
    for (let j = i + 1; j < NUMBER; j++) {
      const pointA = points[i];
      const pointB = points[j];
      const dist = getDist(pointA, pointB);
      if(dist <= DIST) {
        context.strokeStyle = 'white';
        context.lineWidth = (1-dist/DIST)**1/5;
        context.moveTo(pointA.x, pointA.y);
        context.lineTo(pointB.x, pointB.y);
        context.stroke()
      }
    }
  }
}


