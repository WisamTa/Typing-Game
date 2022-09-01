// define variables
let startGame = document.getElementById('startGame');
let startButton = document.getElementById('startButton');
let gamePlay = document.getElementById('gamePlay');
let exampleWord = document.getElementById('exampleWord');
let wordInput = document.getElementById('answerWord');
let wordArray = words.split(' ');
let outputTimer = document.getElementById('timer');
let score = document.getElementById('score');
let endGameContainer = document.getElementById('endGameContainer');
let gameOutcome = document.getElementById('gameOutcome');
let emailBox = document.getElementById('emailBox');
let emailSubmit = document.getElementById('submitEmail');
let sendScore = document.getElementById('sendScore');
let returnStart = document.getElementById('returnStart');

// click event and keydown event to activate start game
startButton.addEventListener('click', playGame);

startButton.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        playGame();
    }
});

//  Input event, the wordCheck function will be activated
wordInput.addEventListener('input', wordCheck);

// click event and keydown event to submit email
emailSubmit.addEventListener('click', submitEmail);

emailSubmit.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        submitEmail();
    }
});

// click event for the return button, to return to start
returnStart.addEventListener('click', Return);

/**
 * collapsible function for the rules of the game
 */
let collapsible = document.getElementsByClassName("collapsible");
let i;
for (i = 0; i < collapsible.length; i++) {
  collapsible[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

/**
 * click event and keyup event to start the game, render a word, start the timer and hide button.
 */
function playGame(event) {
    event.preventDefault();
    // hide start screen
    startGame.className = 'start-game hide';
    // show game play
    gamePlay.className = 'game-container show';
    // focus on word input
    wordInput.focus();
    // output random word
    renderNewWord();
    // start the timer
    timer(59);
}

/**
 * get random word from string of 6 letter words in words.js
 */
function getWord() {
    return wordArray[Math.floor(Math.random() * wordArray.length)];
}

/**
 * set text content of div with id of exampleWord to random word
 */
async function renderNewWord() {
    let word = await getWord();
    exampleWord.innerText = '';
    // create a span for each individual character
    word.split('').forEach(function (character) {
        let characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        exampleWord.appendChild(characterSpan);
    });
    // make sure word input is cleared
    wordInput.value = '';
}

/**
 * set timer to countdown back from 60 and render in display of timer 
 */
function timer(seconds) {
    let counter = seconds;
    let interval = setInterval(function () {
        outputTimer.textContent = counter;
        counter--;
        if (counter < 0) {
            clearInterval(interval);
            endGame();
        }
    }, 1000);
}

/**
 * Compare the example word with the typed input and show correct or incorrect while typing. 
 * When the word is green, a new word will be rendered
 */
function wordCheck() {
    // get all spans of the example word and compare with input value
    let arrayWord = exampleWord.querySelectorAll('span');
    let arrayValue = wordInput.value.split('');
    let correct = true;

    arrayWord.forEach(function (characterSpan, index) {
        let character = arrayValue[index];

        // If it's not typed, it shows no coloring
        if (character == null) {
            characterSpan.classList.remove('incorrect');
            characterSpan.classList.remove('correct');
            correct = false;
        }
        // if it's typed correct, it shows green
        else if (character.toLowerCase() === characterSpan.innerText.toLowerCase()) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
            // if it's typed incorrect, it shows red
        } else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            correct = false;
        }
    });
    // If the correct answer is given, completely green, this renders a new word
    if (correct) {
        renderNewWord();
        scoreCount();
    }
}

/**
 * Count the score and add one in the output
 */
function scoreCount() {
    let oldScore = score.innerText;
    score.innerText = ++oldScore;
}

/**
 * End game will show end game container, show messages and score, return button and email option
 */
function endGame() {
    // wordInput.blur();
    endGameContainer.className = 'end-game-container show';
    gamePlay.className = 'game-container hide';
    gameOutcome.textContent = `Congratulations!!! Your score is ${document.getElementById('score').innerText}`;
    textOutcome.textContent = 'If you would like your score to be send to you, please enter your name and email:';
    sendScore.value = `${document.getElementById('score').innerText}`;
}

/**
 * This is the email function addopted from emailjs and adjusted to fit this website. 
 */
(function () {
    emailjs.init('DGscXQC-1ku4fZMZ-');
})();

window.onload = function () {
    document.getElementById('form').addEventListener('submit', function (event) {
        event.preventDefault();
        alert("Your score  has been sent!");
        emailjs.sendForm('service_6c68e72', 'contact_form', this).then(function () {
                console.log('SUCCESS!');
            }, function (error) {
                console.log('FAILED...', error);
            });
    });
};

/**
 * Go back to the beginning of the game
 */
function Return() {
    // show start screen
    startGame.className = 'start-game show';
    // hide end game screen
    endGameContainer.className = 'end-game-container hide';
    // return score to 0
    document.getElementById('score').innerText = 0;
    // return timer to 60
    document.getElementById('timer').innerText = 60;
}