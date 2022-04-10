// container for all actions 
let container = document.querySelector('.container');
let containerHeight = container.clientHeight;
let containerWidth = container.clientWidth;

// variables for score, timer, name and date 
// score and target
let Target = 30;
let targetScore = document.querySelector('#target');
targetScore.innerHTML = Target;
let counterScore = 0;

// timer
let time = 60;
let timerCount = document.querySelector('#timer');

// name
let nameContainer = document.querySelector('#userName');
nameContainer.innerHTML = userName;

// final score and target for popUp
let scoreSpanContaier = document.querySelector(".finalScore");
let targetSpanContaier = document.querySelector(".target");

// create monkey
let monkey = document.querySelector('.monkey');
let monkeyLeft = monkey.clientLeft;
let monkeyWidth = monkey.clientWidth;
let monkeyTop = monkey.offsetTop;

    


// function for moving monkey
let moveRight = function () {

    monkeyLeft += 20;
    if (monkeyLeft + monkeyWidth >= containerWidth) {
        monkeyLeft = containerWidth - monkeyWidth;
        monkey.style.left = `${monkeyLeft}px`;
    }
    else {
        monkey.style.left = `${monkeyLeft}px`;
    }

}

let moveLeft = function () {
    monkeyLeft -= 20;

    if (monkeyLeft > 0) {
        monkey.style.left = `${monkeyLeft}px`;
    }
    else {
        monkeyLeft = 0;
        monkey.style.left = `${monkeyLeft}px`;
    }

}
 // dealing with arrows to move basket
document.addEventListener('keydown', (event) => {          
    switch (event.key) {
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
    }
});



class Banana {

    constructor(left = 100, container) {
        this.top = 0;
        this.left = left;
        this.width = 30;
        this.height = 60;
        this.container = container;      
        this.speed = 1;
        this.bnanana;

    }

    moveBottom() {

        this.top += this.speed;
        if (this.top + this.height < this.container.clientHeight) {
            this.bnanana.style.top = `${this.top}px`;
        }
        else {
            this.top = this.container.clientHeight - this.height;        // remove the increase
            this.bnanana.style.top = `${this.top}px`;
        }
        return this.top;
    }

    drawBanana() {

        let bananaStyle = `
            width: ${this.width}px; 
            height: ${this.height}px;
            position: absolute;
            top: ${this.top}px;
            left: ${this.left}px;
            `;
        this.bnanana = document.createElement("img");
        this.bnanana.setAttribute('src', 'images/banana.png');
        this.bnanana.setAttribute('style', `${bananaStyle}`);
        this.container.appendChild(this.bnanana);


        let moving = setInterval(() => {                                  // start Moving
            let eat = false;
            if (this.top < this.container.clientHeight - this.height - 20) {
                let currentHeight = this.moveBottom() + this.height;
                let bananaPositon = this.left + this.width;
                let monkeyPosition = monkeyLeft + monkeyWidth;

                if (currentHeight >= monkeyTop) {
                    if (this.left >= monkeyLeft && bananaPositon <= monkeyPosition) {
                        eat = true;
                        this.bnanana.remove();
                        stopMoving(eat);
                    }
                }

            }
            else {
                this.bnanana.setAttribute('src', 'images/peel.png');
                
                setTimeout( ()=> {
                    this.bnanana.remove();
                }, 2000);
                
                stopMoving(eat);
            }
        }, 10);

        let stopMoving = function (eat) {
            if (eat) {
                let score = document.querySelector('#score');
                counterScore++;
                score.innerHTML=counterScore;
            }
            clearInterval(moving);
        }
    }

}


// falling more than one banana
let starFallingBanana = setInterval(() => {
    let randomLeft = Math.floor((Math.random() * containerWidth));

    let banana = new Banana(randomLeft, container);
    banana.drawBanana();

}, 1000);

// dealing with timer
let timer = setInterval(() => { 

    if(time >= 0)
    {
        timerCount = document.querySelector('#timer');
        timerCount.innerHTML = time;
    }
    else
    {
        clearInterval(starFallingBanana);
        stopTimer();
    }
    time--;
    

}, 1000);


// dealing with popUp 
let popUp = document.querySelector("#gameEnded");
let popUpimg = document.querySelector(".winnerOrLoser");

let stopTimer = function () {
    
    if(counterScore >= Target)
    {
        CreatepopUp('winner');
    }
    else
    {
        CreatepopUp('loser');
    }
    postUser(userObject);
    
    clearInterval(timer);
}

// function to create popUp menu
let CreatepopUp = function(status)
{
    if(status == 'winner')
    {
        scoreSpanContaier.style.color = 'green';
    }
    else
    {
        scoreSpanContaier.style.color = 'red';
    }

    scoreSpanContaier.innerHTML = counterScore;
    targetSpanContaier.innerHTML = Target;
    popUpimg.setAttribute('src', `images/${status}.png`);
    popUp.style.visibility = 'visible';
}

// home btn on popUp button
let homeBtn = document.querySelector('.homeButton');
homeBtn.addEventListener('click', function(){
    window.location.href = "index.html";
});










