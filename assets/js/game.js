let startButton = document.getElementById('startButton'); 
let gamePlay = document.getElementById('gamePlay'); 
let exampleWord = document.getElementById('exampleWord')
let wordInput = document.getElementById('answerWord')
let wordArray = words.split(" ");
let outputTimer = document.getElementById('timer')

startButton.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        playGame();
    }
});

startButton.addEventListener('click', function(event) {
    event.preventDefault();
    // hide start button
    startButton.className = 'hide';
    // show gameplay
    // ?????? figure out how to hide the gameplay untill start-button is pushed
    // focus on word input
    wordInput.focus();
    // show random word
    // outputWord();
    renderNewWord();
    // start the timer
    timer(59);
})

wordInput.addEventListener('input', letterCheck);




/**
 * get random word from array of 6 letter words
 */
function getWord() {
    return wordArray[Math.floor(Math.random()*wordArray.length)];
}

/**
 * set text content of div with id of exampleWord to random word
 */
async function renderNewWord() {
    let word = await getWord();
    exampleWord.innerText = ''
    // create a span for each individual character
    word.split('').forEach(character => {
        let characterSpan = document.createElement('span');
        characterSpan.innerText = character
        exampleWord.appendChild(characterSpan)
    });
    // make sure word input is cleared
    wordInput.value = null
}

/**
 * create timer to countdown back from 60, log to div with id of timer 
 */
function timer(seconds) {
    let counter = seconds;
    let interval = setInterval(() => {
        outputTimer.textContent = counter
        counter--;
        if (counter < 0 ) {
            clearInterval(interval);
            outputTimer.textContent = "You're Time Is Up!"
        }
    }, 1000);
}

function letterCheck() {
    // get all spans of the example word
    let arrayWord = exampleWord.querySelectorAll('span')
    let arrayValue = wordInput.value.split('')
    arrayWord.forEach((characterSpan, index) => {
        let character = arrayValue[index];
        // If it's not typed, it shows no coloring
        if (character == null) {
            characterSpan.classList.remove('incorrect');
            characterSpan.classList.remove('correct');
        }
        // if it's typed correct, it shows green
        else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        // if it's typed incorrect, it show red
        } else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
        }
    })
}

function answerCheck() {
    
}

function scoreCount() {
    
}

function endGame() {
    
}

function emailScore() {
    
}