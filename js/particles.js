
const canvas = document.getElementById('particle-bg');
const ctx = canvas.getContext('2d');

let particlesArray;
let linesArray;
let numParticles = 50;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }
  draw() {
    ctx.fillStyle = 'rgba(179, 182, 198, 0.6)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
  drawLines1() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.strokeStyle = 'rgba(106, 107, 109, 0.08)';
    ctx.stroke();
  }  
}

function init() {
  particlesArray = [];
  for (let i = 0; i < numParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(particle => {
  particle.update();
  particle.draw();
  particle.drawLines1();
  });
  requestAnimationFrame(animate);
}

init();
animate();