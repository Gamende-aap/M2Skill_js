const canvas = document.getElementById('canvasId');
const g = canvas.getContext('2d');
    
function ball(xpos, ypos , size , color) {
    g.fillStyle = color;
    g.beginPath();
    g.arc(xpos, ypos, size, 0, Math.PI * 2);
    g.closePath();
    g.fill();
    g.stroke();
}

function RandomHSL (){
    let h = Math.floor(Math.random() * 360);
    let s = Math.floor(Math.random() * 100);
    let l = Math.floor(Math.random() * 100);
    let hsl = `hsl(${h}, ${s}%, ${l}%)`;
    return hsl; 
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
}

drawTree(450, canvas.height - 100, 0.9);
for (let i = 0; i < 10; i++){
ball(410 + (Math.random() *90), 450 + Math.random() *50, Math.random()*10, hsl = RandomHSL ());
}