// Birthday person info
const birthdayPerson = {
  name: "Mokshith Ram",
  image: "assets/birthday-person.jpg"
};
document.getElementById('name').innerText = birthdayPerson.name;
document.querySelector('.birthday-person').src = birthdayPerson.image;

// Cake & Music
const cake = document.getElementById('cake');
const bgMusic = document.getElementById('bg-music');

cake.addEventListener('click', () => {
  if (bgMusic.paused) bgMusic.play().catch(() => console.log("Music blocked"));

  // Cake animation
  cake.style.transform = "scale(1.3)";
  setTimeout(() => { cake.style.transform = "scale(1)"; }, 500);

  createSparkles();
  createFireworks();
  throwBalloons();
  createExtraBirthdayPersons();
});

// Fireworks
function createFireworks() {
  const fireworkX = Math.random() * window.innerWidth;
  const fireworkY = Math.random() * window.innerHeight;
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'firework-particle';
    particle.style.left = fireworkX + 'px';
    particle.style.top = fireworkY + 'px';
    particle.style.backgroundColor = getRandomColor();
    const angle = Math.random() * 2 * Math.PI;
    const radius = 50 + Math.random() * 50;
    particle.style.setProperty('--x', `${radius * Math.cos(angle)}px`);
    particle.style.setProperty('--y', `${radius * Math.sin(angle)}px`);
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1000);
  }
}

// Sparkles
function createSparkles() {
  for (let i = 0; i < 15; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = cake.offsetLeft + Math.random() * cake.width + 'px';
    sparkle.style.top = cake.offsetTop + Math.random() * cake.height + 'px';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  }
}

// Balloons
function throwBalloons() {
  const rect = cake.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top;
  for (let i = 0; i < 10; i++) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.left = startX + Math.random() * 30 - 15 + 'px';
    balloon.style.bottom = window.innerHeight - startY + 'px';
    balloon.style.backgroundColor = getRandomColor();
    balloon.style.animationDuration = 5 + Math.random() * 3 + 's';
    document.body.appendChild(balloon);
    setTimeout(() => balloon.remove(), 8000);
  }
}

// Random floating balloons
function createBalloon() {
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  balloon.style.left = Math.random() * window.innerWidth + 'px';
  balloon.style.backgroundColor = getRandomColor();
  balloon.style.animationDuration = 5 + Math.random() * 5 + 's';
  document.body.appendChild(balloon);
  setTimeout(() => balloon.remove(), 10000);
}
setInterval(createBalloon, 500);

// Extra birthday-person images float up randomly
function createExtraBirthdayPersons() {
  for (let i = 0; i < 5; i++) {
    const extra = document.createElement('img');
    extra.src = birthdayPerson.image;
    extra.className = 'extra-birthday-person';
    extra.style.left = Math.random() * (window.innerWidth - 120) + 'px';
    extra.style.top = window.innerHeight + 'px';
    document.body.appendChild(extra);
    setTimeout(() => extra.remove(), 12000);
  }
}

// Random color helper
function getRandomColor() {
  const colors = ['#ff4d4d', '#4dff4d', '#4d4dff', '#ffff4d', '#ff4dff', '#00ffff'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// -------------------
// Confetti Animation
// -------------------
const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

const confettiParticles = [];
for (let i = 0; i < 200; i++) {
  confettiParticles.push({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * -confettiCanvas.height,
    size: 5 + Math.random() * 5,
    speed: 2 + Math.random() * 3,
    color: getRandomColor(),
    angle: Math.random() * 2 * Math.PI
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParticles.forEach(p => {
    p.y += p.speed;
    p.x += Math.sin(p.angle) * 2;
    p.angle += 0.02;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);

    if (p.y > confettiCanvas.height) {
      p.y = -p.size;
      p.x = Math.random() * confettiCanvas.width;
      p.color = getRandomColor();
    }
  });
  requestAnimationFrame(drawConfetti);
}
drawConfetti();

window.addEventListener('resize', () => {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});
