// Very simple, "beginner" looking drawing code
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const W = canvas.width;
const H = canvas.height;

// background: plain sky and simple snow
ctx.fillStyle = '#345ea8';
ctx.fillRect(0, 0, W, H);
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, H - 120, W, 120);

// draw a very simple tree (three green triangles and a brown trunk)
function drawTreeSimple(x, baseY) {
  // trunk
  ctx.fillStyle = '#8b5a2b';
  ctx.fillRect(x - 10, baseY - 40, 20, 40);

  // three triangles
  ctx.fillStyle = '#0a8f11';
  ctx.beginPath();
  ctx.moveTo(x, baseY - 120);
  ctx.lineTo(x - 50, baseY - 60);
  ctx.lineTo(x + 50, baseY - 60);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x, baseY - 90);
  ctx.lineTo(x - 40, baseY - 40);
  ctx.lineTo(x + 40, baseY - 40);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x, baseY - 60);
  ctx.lineTo(x - 30, baseY - 20);
  ctx.lineTo(x + 30, baseY - 20);
  ctx.closePath();
  ctx.fill();

  // simple star: yellow circle (beginner would cheat)
  ctx.fillStyle = '#ffd700';
  ctx.beginPath();
  ctx.arc(x, baseY - 130, 10, 0, Math.PI * 2);
  ctx.fill();

  // 8 simple baubles: sample positions inside the green triangles so
  // ornaments always appear on the green tree only
  function samplePointInTri(ax, ay, bx, by, cx2, cy2) {
    // barycentric sampling
    let r1 = Math.random();
    let r2 = Math.random();
    if (r1 + r2 >= 1) {
      r1 = 1 - r1;
      r2 = 1 - r2;
    }
    const px = ax + r1 * (bx - ax) + r2 * (cx2 - ax);
    const py = ay + r1 * (by - ay) + r2 * (cy2 - ay);
    return {x: px, y: py};
  }

  const tri1 = {ax: x, ay: baseY - 120, bx: x - 50, by: baseY - 60, cx: x + 50, cy: baseY - 60};
  const tri2 = {ax: x, ay: baseY - 90, bx: x - 40, by: baseY - 40, cx: x + 40, cy: baseY - 40};
  const tri3 = {ax: x, ay: baseY - 60, bx: x - 30, by: baseY - 20, cx: x + 30, cy: baseY - 20};
  const triList = [tri1, tri2, tri3];
  const colors = ['#ff0000','#ffd700','#00aaff','#ff00aa','#ff8800','#33cc33','#cc99ff','#999999'];
  for (let i = 0; i < 8; i++) {
    const tri = triList[i % triList.length];
    const p = samplePointInTri(tri.ax, tri.ay, tri.bx, tri.by, tri.cx, tri.cy);
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
    ctx.fill();
  }
}

// simple house function
function drawHouseSimple(x, baseY, w, h, wall, roof, lit) {
  // wall
  ctx.fillStyle = wall;
  ctx.fillRect(x, baseY - h, w, h);

  // roof: simple triangle
  ctx.fillStyle = roof;
  ctx.beginPath();
  ctx.moveTo(x - 5, baseY - h);
  ctx.lineTo(x + w / 2, baseY - h - (h * 0.5));
  ctx.lineTo(x + w + 5, baseY - h);
  ctx.closePath();
  ctx.fill();

  // door (just rectangle)
  ctx.fillStyle = '#5a3416';
  ctx.fillRect(x + w / 2 - 10, baseY - 30, 20, 30);

  // windows (simple squares). If `lit` is true, show warm light.
  const windowColor = lit ? '#fff1a0' : '#aee7ff';
  ctx.fillStyle = windowColor;
  ctx.fillRect(x + 10, baseY - h + 10, 20, 20);
  ctx.fillRect(x + w - 30, baseY - h + 10, 20, 20);
}

// draw 4 houses at random non-overlapping positions and sizes
const baseHouseW = 100;
const baseHouseH = 70;
const houseCount = 4;
const baseY = H - 30;
const placed = [];
const wallColors = ['#f5d0a9','#ffd2e0','#d0f0d0','#f2f2b0'];
const roofColors = ['#8b0000','#6b4226','#2f4f4f','#8b2500'];

// approximate tree box to keep houses away
const treeX = W - 120;
const treeBox = { left: treeX - 70, right: treeX + 70, top: baseY - 140, bottom: baseY };

function rectsOverlap(a, b) {
  return !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
}

// determine if window lights should be on (local time >= 18:00)
const now = new Date();
const lightsOn = now.getHours() >= 18;

for (let i = 0; i < houseCount; i++) {
  let placedOk = false;
  let tries = 0;
  while (!placedOk && tries < 500) {
    tries++;
    const w = baseHouseW * (0.85 + Math.random() * 0.3); // 85%..115%
    const h = baseHouseH * (0.85 + Math.random() * 0.3);
    const margin = 10;
    const x = margin + Math.random() * (W - margin - w - 20);
    const y = baseY;
    const box = { left: x, right: x + w, top: y - h, bottom: y };

    // avoid tree
    if (rectsOverlap(box, treeBox)) continue;

    // avoid overlap with previously placed houses
    let collision = false;
    for (const p of placed) {
      if (rectsOverlap(box, p.box)) { collision = true; break; }
    }
    if (collision) continue;

    // place house
    const wall = wallColors[i % wallColors.length];
    const roof = roofColors[i % roofColors.length];
    drawHouseSimple(x, y, w, h, wall, roof, lightsOn);
    placed.push({ box, x, y, w, h });
    placedOk = true;
  }

  if (!placedOk) {
    // fallback: place sequentially on the left side
    const fx = 20 + i * (baseHouseW + 10);
    drawHouseSimple(fx, baseY, baseHouseW, baseHouseH, wallColors[i % wallColors.length], roofColors[i % roofColors.length], lightsOn);
    placed.push({ box: { left: fx, right: fx + baseHouseW, top: baseY - baseHouseH, bottom: baseY } });
  }
}

// draw one simple tree (moved almost to the right)
drawTreeSimple(W - 120, baseY);

// beginner text style
ctx.fillStyle = '#ffffff';
ctx.font = '40px Comic Sans MS, sans-serif';
ctx.fillText('Fijne Kerst!', 275, 70);

// some sloppy snow dots (random)
for (let i = 0; i < 80; i++) {
  ctx.fillStyle = '#fff';
  const sx = Math.random() * W;
  const sy = Math.random() * (H - 120);
  ctx.fillRect(sx, sy, 3, 3);
}
// finished drawing