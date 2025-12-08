// main.js — cleaned version with no ornaments
const canvas = document.getElementById('canvasId');
const g = canvas.getContext('2d');

function drawBackground() {
  const sky = g.createLinearGradient(0, 0, 0, canvas.height);
  sky.addColorStop(0, '#081329');
  sky.addColorStop(1, '#3b6aa0');
  g.fillStyle = sky;
  g.fillRect(0, 0, canvas.width, canvas.height);

  // sneeuw
  g.fillStyle = '#ffffff';
  g.fillRect(0, canvas.height - 120, canvas.width, 120);
}

function drawStar(x, y, r, color = '#FFD700') {
  g.save();
  g.translate(x, y);
  g.beginPath();
  for (let i = 0; i < 5; i++) {
    g.lineTo(0, -r);
    g.rotate((Math.PI * 2) / 10);
    g.lineTo(0, -r / 2);
    g.rotate((Math.PI * 2) / 10);
  }
  g.closePath();
  g.fillStyle = color;
  g.fill();
  g.restore();
}

function drawHouse(x, y, s = 1) {
  g.fillStyle = '#c94f4f';
  g.fillRect(x, y - 50 * s, 120 * s, 80 * s);

  g.beginPath();
  g.moveTo(x - 10 * s, y - 50 * s);
  g.lineTo(x + 60 * s, y - 120 * s);
  g.lineTo(x + 130 * s, y - 50 * s);
  g.closePath();
  g.fillStyle = '#6b3f2a';
  g.fill();

  g.fillStyle = '#3a2d26';
  g.fillRect(x + 45 * s, y - 30 * s, 30 * s, 30 * s);

  g.fillStyle = '#ffe9a8';
  g.fillRect(x + 10 * s, y - 40 * s, 20 * s, 20 * s);
  g.fillRect(x + 90 * s, y - 40 * s, 20 * s, 20 * s);

  g.fillStyle = '#ffffff';
  g.beginPath();
  g.moveTo(x - 10 * s, y - 50 * s);
  g.quadraticCurveTo(x + 60 * s, y - 90 * s, x + 130 * s, y - 50 * s);
  g.fill();
}

function drawTree(x, y, s = 1, ornaments = true, ornamentCount = 12) {
  // stam
  g.fillStyle = '#5a3718';
  g.fillRect(x - 10 * s, y - 10 * s, 20 * s, 30 * s);

  // drie lagen
  g.fillStyle = '#0b8a2b';
  for (let i = 0; i < 3; i++) {
    g.beginPath();
    g.moveTo(x - 60 * s + i * 15 * s, y - 10 * s - i * 30 * s);
    g.lineTo(x, y - 90 * s - i * 30 * s);
    g.lineTo(x + 60 * s - i * 15 * s, y - 10 * s - i * 30 * s);
    g.closePath();
    g.fill();
  }

  // optionally draw ornaments only on this tree
  if (ornaments) {
    drawOrnamentsOnTree(x, y, s, ornamentCount);
  }
}
  
function ball(xpos, ypos , size , color) {
  // plain filled ornament (no stroke/highlight)
  g.fillStyle = color;
  g.beginPath();
  g.arc(xpos, ypos, size, 0, Math.PI * 2);
  g.closePath();
  g.fill();
}

function RandomHSL (){
    let h = Math.floor(Math.random() * 360);
    let s = Math.floor(Math.random() * 100);
    let l = Math.floor(Math.random() * 100);
    let hsl = `hsl(${h}, ${s}%, ${l}%)`;
    return hsl; 
}

// generate random point inside triangle using barycentric technique
function randomPointInTriangle(x1, y1, x2, y2, x3, y3) {
  let r1 = Math.random();
  let r2 = Math.random();
  if (r1 + r2 >= 1) {
    r1 = 1 - r1;
    r2 = 1 - r2;
  }
  const aX = x1 + r1 * (x2 - x1) + r2 * (x3 - x1);
  const aY = y1 + r1 * (y2 - y1) + r2 * (y3 - y1);
  return { x: aX, y: aY };
}

// scatter ornaments inside the tree's triangular layers only
function drawOrnamentsOnTree(x, y, s = 1, count = 12) {
  // distribute count across the layers: top, middle, bottom
  const proportions = [0.2, 0.35, 0.45];
  for (let layer = 0; layer < 3; layer++) {
    const num = Math.max(1, Math.round(count * proportions[layer]));
    // triangle vertices for this layer
    const x1 = x - 60 * s + layer * 15 * s;
    const y1 = y - 10 * s - layer * 30 * s;
    const x2 = x;
    const y2 = y - 90 * s - layer * 30 * s;
    const x3 = x + 60 * s - layer * 15 * s;
    const y3 = y - 10 * s - layer * 30 * s;

    for (let i = 0; i < num; i++) {
      const p = randomPointInTriangle(x1, y1, x2, y2, x3, y3);
      // size scaled with tree size
      const r = Math.max(3, Math.random() * 8 * s);
      ball(p.x, p.y, r, RandomHSL());
    }
  }
}

function drawCard() {
  drawBackground();

  // sterren / piek
  drawStar(320, 327, 15);
  drawStar(450, 357, 12);
  drawStar(120, 80, 12);
  drawStar(220, 40, 8);
  drawStar(430, 60, 10);
  drawStar(640, 90, 6);

  // huizen en bomen
  drawHouse(120, canvas.height - 130, 1);
  drawTree(320, canvas.height - 100, 1.1);
  drawTree(450, canvas.height - 100, 0.9);
  drawHouse(560, canvas.height - 140, 0.8);

// removed canvas-wide random balls — ornaments will be drawn only on trees



  // tekst
  g.fillStyle = '#ffffff';
  g.font = '48px Georgia';
  g.textAlign = 'center';
  g.fillText('Merry Christmas', canvas.width / 2, canvas.height - 30);

  // ondertekst
  g.font = '12px monospace';
  g.fillStyle = '#e8f0ff';
  g.textAlign = 'left';
  g.fillText('Tekening gemaakt met JavaScript canvas — veel oefenplezier!', 8, canvas.height - 8);
}

// run
drawCard();

