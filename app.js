const responses = [
    "b", // 1
    "b", // 2
    "b", // 3
    "b", // 4
    "c", // 5
    "b", // 6
    "d", // 7
    "c", // 8
    "b", // 9
    "b", // 10
    "b", // 11
    "a", // 12
    "c", // 13
    "b", // 14
    "d", // 15
    "c", // 16
    "b", // 17
    "c", // 18
    "a", // 19
    "c", // 20
    "c", // 21
    "a", // 22
    "c", // 23
    "c", // 24
    "a", // 25

];


console.log("nombre de question " + responses.length);
const numberQestion = document.querySelector(".numberQestion")

console.log(numberQestion);

if (numberQestion !=null) {

    numberQestion.textContent = responses.length
    const form = document.querySelector(".quiz-form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();

    const results = [];
    const radioButtons = document.querySelectorAll("input[type='radio']:checked")

    radioButtons.forEach((radioButton, index) => {
        if (radioButton.value === responses[index]) {
            results.push(true);
        } else {
            results.push(false);
        }
    });

    showResukts(results);
    addColors(results)
}
const titleResult = document.querySelector(".result h2")
const markResult = document.querySelector(".mark")
const helpResult = document.querySelector(".help")

function showResukts(results) {
    let errorNumber = results.filter(el => el === false).length;
    console.log("nombre d'erreur " + errorNumber);

    helpResult.innerHTML = `<a class ="lien" href="solution.html">voir la solution</a>`
    markResult.textContent = (responses.length - errorNumber) + "/" + (responses.length);



    if (errorNumber == 0) {
        titleResult.textContent = "Vous êtes un pro aucune erreur";
        //markResult.textContent = (responses.length - errorNumber) + "/" + (responses.length);
    } else if (errorNumber <= Math.ceil(responses.length / 4)) {
        titleResult.textContent = "Presque, un sans faute !!";
        //markResult.textContent = (responses.length - errorNumber) + "/" + (responses.length)
    } else if (errorNumber <= Math.ceil(responses.length / 2)) {
        titleResult.textContent = "Pas trop mal";
        //markResult.textContent = (responses.length - errorNumber) + "/" + (responses.length)
    } else if (errorNumber <= Math.ceil(responses.length / 4) * 2) {
        titleResult.textContent = "Peux mieux faire";
        //markResult.textContent = (responses.length - errorNumber) + "/" + (responses.length)
    }
    else {
        titleResult.textContent = "Vous allez y arriver";
        //markResult.textContent = (responses.length - errorNumber) + "/" + (responses.length)
    }

}

const questions = document.querySelectorAll(".question-block");
// all selectionne toute les class portant le non

function addColors(results) {

    results.forEach((response, index) => {

        if (results[index]) {
            questions[index].style.backgroundImage = "linear-gradient(to right, #a8ff78, #78ffd6)"
        } else {
            questions[index].style.backgroundImage = "linear-gradient(to right, #f5567b, #fd674c)"
        }
    })
}


// reset color
const radioInputs = document.querySelectorAll("input[type='radio']");
radioInputs.forEach(radioInputs => radioInputs.addEventListener('input',
    resetColor))

function resetColor(e) {


    const index = e.target.getAttribute("name").slice(1) - 1;
    const parentQuestionBlock = questions[index];

    parentQuestionBlock.style.backgroundVolor = "#f1f1f1";
    parentQuestionBlock.style.backgroundImage = "none";

    titleResult.textContent = "Cliquez sur validez ✔️ pour validez vos résultat"
    markResult.textContent = ""
    helpResult.textContent = ""
}

}


// -----------------------------------------------------------------------particule ----------------------------------------------------------------------- \\

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
// d'avoir acces au creation de ligne, cercle, clear...

canvas.width = window.innerWidth;// on redefinit la largeur par securiter
canvas.height = window.innerHeight;// on redefinit la Hauteur par securiter

class Particle {
    // qui dit class , dit constructor obligatoire les class sont des usine a objet
    constructor(x, y, directionX, directionY, size, color) {
        // propriete definit

        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;

    }
    draw() {
        ctx.beginPath()
        // on commentce le chemin
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // creer le cercle 2pi raadian = cercle
        ctx.fillStyle = this.color;
        ctx.fill();
        // permet de remplir le cervle
    }




    update() {
        if (this.x > canvas.width || this.x < 0) {
            //si la particule touche un bord X
            this.directionX = -this.directionX;
        }

        else if (this.y > canvas.height || this.y < 0) {
            //si la particule touche un bord y
            this.directionY = -this.directionY;
        }

        // permet de bouger la particule dans la fenetre
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw()
    }
}

const particle1 = new Particle(10, 10, 50, 55, 2, "#f1f1f1")
console.log(particle1);

let particlesArray;
function init() {
    particlesArray = [];

    const numberOfParticles = (canvas.height * canvas.width) / 9000;
    numberOfParticles
    for (let i = 0; i < numberOfParticles; i++) {
        // [1,3[
        const size = (Math.random() * 2) + 1
        // return Math.random() * (max - min + 1) + min;
        const x = Math.random() * ((innerWidth - 10) - 10 + 1) + 10;
        const y = Math.random() * ((innerHeight - 10) - 10 + 1) + 10;

        const directionX = clearDirection()
        const directionY = clearDirection()

        particlesArray.push(new Particle(x, y, directionX, directionY, size, "#f1f1f1"))

        //console.log(particlesArray);
    }
}

init()

function clearDirection() {
    const random = Math.trunc(Math.random() * 2)//0 ou 1

    if (random) {
        // definit la vitesse

        // de 0.5 à 1.5 non inclu
        return (Math.random() * 1 + 0.3);
    }
    else {
        return (Math.random() * -1 - 0.3);
    }
}

function animate() {
    ctx.clearRect(0, 0, innerWidth, innerHeight)

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
    }

    connect()
    requestAnimationFrame(animate)
    //permet de rapeler l'animation netoye et reaparait les particule tout les 60ms
}
animate()


function connect() {

    for(let i = 0; i < particlesArray.length; i++) {
        for(let j = i + 1; j < particlesArray.length; j++){

            const squaredDistanceX = (particlesArray[i].x - particlesArray[j].x) * (particlesArray[i].x - particlesArray[j].x)
            const squaredDistanceY = (particlesArray[i].y - particlesArray[j].y) * (particlesArray[i].y - particlesArray[j].y)
    
            const hypothenuse = squaredDistanceX + squaredDistanceY;

            if(hypothenuse < (135 * 135)) {
                ctx.strokeStyle = `rgba(240,240,240,${1 - hypothenuse/ (135*135)})`
                // opacité du trait de connection
                ctx.lineWidth = 0.4;
                ctx.beginPath()
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
                ctx.stroke()
            }
        }
    }
}

window.addEventListener("resize", handleResize)
// ecoute le redimentionnement de la fenetre

function handleResize () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init()
}