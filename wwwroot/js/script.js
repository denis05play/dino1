const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const cube = document.getElementById("cube");
const btn = document.getElementById("btn");
const score = document.getElementById("score");
const latestScore = document.getElementById("latest");
let counter = 0;
let jumpCount = 0;
let movingInterval;

document.addEventListener("keydown", function (event) {
    if (event.keyCode === 32) { // Пробел для прыжка
        jump();
    } else if (event.keyCode === 40) { // Стрелка вниз для приседания
        duck();
    } else if (event.keyCode === 83) { // 'S' для стрельбы
        shoot();
    }
});

function jump() {
    if (jumpCount < 3 && !dino.classList.contains("duck")) {
        jumpCount++;
        dino.classList.add("jump");
        dino.style.backgroundImage = "url('/img/dino2.png')";
        setTimeout(function () {
            dino.classList.remove("jump");
            dino.style.backgroundImage = "url('/img/dino.png')";
            jumpCount--;
        }, 500);
    }
}

function duck() {
    if (!dino.classList.contains("duck") && !dino.classList.contains("jump")) {
        dino.classList.add("duck");
        dino.style.backgroundImage = "url('/img/dino3.png')";
        setTimeout(function () {
            dino.classList.remove("duck");
            dino.style.backgroundImage = "url('/img/dino.png')";
        }, 500);
    }
}

function shoot() {
    const bullet = document.createElement("div");
    bullet.classList.add("bullet");
    document.body.appendChild(bullet);
    bullet.style.left = dino.offsetLeft + 50 + 'px';
    bullet.style.top = dino.offsetTop + 'px';

    let bulletInterval = setInterval(function () {
        let bulletLeft = parseInt(window.getComputedStyle(bullet).getPropertyValue("left"));
        if (bulletLeft > window.innerWidth) {
            clearInterval(bulletInterval);
            bullet.remove();
        } else {
            bullet.style.left = bulletLeft + 10 + 'px';
        }
    }, 20);
}
function stopGame() {
    if (btn.innerText === "Stop") {
        
        cactus.classList.remove("move");
        cube.classList.remove("move");
        btn.innerText = "Start";
        latestScore.innerHTML = Math.floor(counter / 10);
        counter = 0;
    } else {
        
        cactus.classList.add("move");
        cube.classList.add("move");
        btn.innerText = "Stop";
        counter++;
        score.innerHTML = `Score: ${Math.floor(counter / 10)}`;
    }
}

let isAlive = setInterval(function () {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
    let cubeLeft = parseInt(window.getComputedStyle(cube).getPropertyValue("left"));

   
    if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140 && !dino.classList.contains("jump")) {
        alert("GAME OVER - You should have jumped!");
        latestScore.innerHTML = Math.floor(counter / 10);
        counter = 0;
    }

    
    if (cubeLeft < 50 && cubeLeft > 0 && dinoTop >= 140 && !dino.classList.contains("duck")) {
        alert("GAME OVER - You should have ducked!");
        latestScore.innerHTML = Math.floor(counter / 10);
        counter = 0;
    }

    if (btn.innerText == "Stop") {
        counter++;
        score.innerHTML = `Score: ${Math.floor(counter / 10)}`;
    }
}, 10);

function moveCube() {
    let cubeInterval = setInterval(function () {
        let cubeLeft = parseInt(window.getComputedStyle(cube).getPropertyValue("left"));
        if (cubeLeft < -50) {
            cube.style.left = '800px'; // Сброс позиции
        } else {
            cube.style.left = cubeLeft - 5 + 'px'; // Движение влево
        }
    }, 20);
}

btn.addEventListener("click", function (event) {
    stopGame();
    moveCube(); // Начать движение кубика
});