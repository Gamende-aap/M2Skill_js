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
for (let i = 0; i < 150; i++){
ball(Math.random() *800, Math.random() *600, Math.random()*100, hsl = RandomHSL ());
}