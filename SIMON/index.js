let gameSeq = []
let userSeq = []

let btns = ['red', 'yellow', 'grey', 'purple']

let started = false
let level = 0
let highestScore = 0;

let h2 = document.querySelector("h2")
let hs = document.querySelector(".highestScore")

document.addEventListener("keypress", function () {
    if(started === false) {
        console.log("Game started")
        started = true

        levelUp()
    }
})

function btnFlash(btn) {
    btn.classList.add("flash")
    setTimeout(function () {
        btn.classList.remove("flash")
    }, 250)
}

function userFlash(btn) {
    btn.classList.add("userFlash")
    setTimeout(function () {
        btn.classList.remove("userFlash")
    }, 500)
}

function levelUp() {
    userSeq = [];
    level++
    h2.innerText = `Level ${level}`

    let randomIndex = Math.floor(Math.random() * 4 )
    let randomColor = btns[randomIndex]
    let randomButton = document.querySelector(`.${randomColor}`)
    gameSeq.push(randomColor)
    console.log(gameSeq)
    btnFlash(randomButton)
}


function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length === gameSeq.length)
            setTimeout(levelUp, 1000);
    } else {
        h2.innerText = `Game Over! Your score was ${level}\n Press any key to start.`

        highestScore = Math.max(highestScore, level);
        hs.innerText = `Highest Score = ${highestScore}`;

        document.querySelector("body").style.backgroundColor = 'red'
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = 'white'
        }, 500)
        reset();
    }
}

function btnPress() {
    let btn = this
    userFlash(btn)

    let userColour = btn.getAttribute("id")
    userSeq.push(userColour)

    checkAns(userSeq.length - 1)
}

let allBtns = document.querySelectorAll(".btn")
for(btn of allBtns) {
    btn.addEventListener("click", btnPress)
}

function reset() {
    started = false;
    gameSeq= []
    userSeq = []
    level = 0;
}
