// --- LÓGICA DEL MENÚ HAMBURGUESA ---
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });
}

function closeMenu() {
    if (navbar && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
    }
}

// --- CONTADOR ---
const eventDate = new Date("September 23, 2026 09:00:00").getTime();
const updateCountdown = () => {
    const now = new Date().getTime();
    const difference = eventDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
    }
};
setInterval(updateCountdown, 1000);
updateCountdown();

// --- TEMÁTICAS ---
const descriptions = {
    ia: { title: "Inteligencia Artificial", text: "Integración de Machine Learning y automatización avanzada." },
    ot: { title: "Operaciones (OT)", text: "Supervisión de sistemas SCADA y redes industriales." },
    datos: { title: "Datos", text: "Estrategias de Big Data y analítica en tiempo real." },
    ciber: { title: "Ciberseguridad", text: "Protección de infraestructuras críticas." },
    entornos: { title: "Entornos Digitales", text: "Modelos Cloud/Edge Computing." },
    ind5: { title: "Industria 5.0", text: "Colaboración hombre-robótica y sostenibilidad." }
};

let activeTopicKey = null;

function showDescription(key, element) {
    const box = document.getElementById('description-box');

    // Si se vuelve a presionar la misma temática que ya está activa, se cierra
    if (activeTopicKey === key) {
        closeDescription();
        return;
    }

    // Remueve la clase activa de las demás tarjetas
    document.querySelectorAll('.topic-card').forEach(card => card.classList.remove('active'));
    
    // Activa la tarjeta seleccionada
    element.classList.add('active');
    activeTopicKey = key;

    // Asigna el texto y muestra la caja
    document.getElementById('desc-title').innerText = descriptions[key].title;
    document.getElementById('desc-text').innerText = descriptions[key].text;
    box.style.display = 'block';
}

function closeDescription() {
    const box = document.getElementById('description-box');
    box.style.display = 'none';
    
    // Quita la selección de todas las tarjetas
    document.querySelectorAll('.topic-card').forEach(card => card.classList.remove('active'));
    activeTopicKey = null;
}

// --- CONTROL DE VISTA COMITÉ ORGANIZADOR ---
function toggleCommittee() {
    const container = document.getElementById('committee-container');
    if (container.style.display === 'block') {
        closeCommittee();
    } else {
        container.style.display = 'block';
        container.scrollIntoView({ behavior: 'smooth' });
    }
}

function closeCommittee() {
    const container = document.getElementById('committee-container');
    container.style.display = 'none';
    document.getElementById('sobre-codice').scrollIntoView({ behavior: 'smooth' });
}

// --- CAMBIAR PESTAÑAS DE DÍAS EN EL PROGRAMA ---
function switchDay(dayNumber) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.timeline-content').forEach(content => content.classList.remove('active'));

    document.querySelectorAll('.tab-btn')[dayNumber - 1].classList.add('active');
    document.getElementById(`day-${dayNumber}`).classList.add('active');
}

// --- CONTROL DE TALLERES ---
function toggleTalleres() {
    const container = document.getElementById('workshops-container');
    if (container.style.display === 'block') {
        closeTalleres();
    } else {
        container.style.display = 'block';
        container.scrollIntoView({ behavior: 'smooth' });
    }
}

function closeTalleres() {
    const container = document.getElementById('workshops-container');
    container.style.display = 'none';
    document.getElementById('convocatoria').scrollIntoView({ behavior: 'smooth' });
}

// --- ANIMACIÓN DE RED DE NODOS (PARTÍCULAS) EN PROGRAMA ---
const canvas = document.getElementById("canvas-network");
const ctx = canvas.getContext("2d");

let particlesArray = [];
const numberOfParticles = 45;

function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 2;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.color = Math.random() > 0.4 ? "#0b1f52" : "#f28b00";
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function connectParticles() {
    const maxDistance = 120;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                let opacity = 1 - (distance / maxDistance);
                ctx.strokeStyle = `rgba(11, 31, 82, ${opacity * 0.25})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animateNetwork);
}

initParticles();
animateNetwork();