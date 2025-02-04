const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Flor {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.petalos = [];
        for (let i = 0; i < 6; i++) {
            let angle = (Math.PI / 3) * i;
            this.petalos.push({
                x: x + Math.cos(angle) * 20,
                y: y + Math.sin(angle) * 20
            });
        }
    }

    dibujar() {
        ctx.beginPath();
        ctx.fillStyle = "#FF69B4";
        for (let petalo of this.petalos) {
            ctx.moveTo(this.x, this.y);
            ctx.arc(petalo.x, petalo.y, 10, 0, Math.PI * 2);
        }
        ctx.fill();
        
        // Centro de la flor
        ctx.beginPath();
        ctx.fillStyle = "#FFD700";
        ctx.arc(this.x, this.y, 7, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Corazon {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velocidad = Math.random() * 2 + 1;
    }

    dibujar() {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x - 10, this.y - 10, this.x - 15, this.y + 5, this.x, this.y + 15);
        ctx.bezierCurveTo(this.x + 15, this.y + 5, this.x + 10, this.y - 10, this.x, this.y);
        ctx.fill();
    }

    mover() {
        this.y -= this.velocidad;
    }
}

let flores = [];
let corazones = [];

for (let i = 0; i < 10; i++) {
    flores.push(new Flor(Math.random() * canvas.width, Math.random() * canvas.height * 0.7 + canvas.height * 0.3));
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    flores.forEach(flor => flor.dibujar());

    if (Math.random() < 0.05) {
        corazones.push(new Corazon(Math.random() * canvas.width, canvas.height));
    }

    corazones.forEach((corazon, i) => {
        corazon.mover();
        corazon.dibujar();
        if (corazon.y < 0) corazones.splice(i, 1);
    });

    requestAnimationFrame(animar);
}

animar();
