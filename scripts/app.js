/*-------------- Constants -------------*/
const MASTERROWS = 10
const MASTERCOLUMNS = 4
const COLOURS = ['red', 'blue', 'green', 'black', 'yellow', 'pink', 'orange', 'purple', 'white']
const FEEDBACK = ['red', 'white']
const FEEDBACKGRID = 4
const GUESSBTN = 1

/*---------- Variables (state) ---------*/

let colourPegSelected
let selectedPeg
let secretCodeAnswer = []
let currentRow = 9
let redPegs = 0
let whitePegs = 0
let gameOver = false

/*----- Cached Element References  -----*/
const PLAYAGAINBTN = document.querySelector('#play-again-button')
const STARTGAMEEL = document.querySelector('#start-game-again')
const TITLEDES = document.querySelector('#title-description')
const DECODINGBOARD = document.querySelector('#main-board-container')
const COLOURPEGS = document.querySelector('#colour-pegs')
const SECRETCODE = document.querySelector('#secret-code')
const SECRETCODECONTAINER = document.querySelector('#secret-code-pegs')
const GAMECONTAINER = document.querySelector('#gameboard-container')
const SOUNDS = {
    click: new Audio('./sounds/button-click.wav'),
    rowFailed: new Audio('./sounds/neutral-fail.mp3'),
    won: new Audio('./sounds/won.mp3'),
    lost: new Audio('./sounds/loss.mp3')
}

/*-------------- Functions -------------*/

function decodingBoard() {
    colouredBtns();
    DECODINGBOARD.innerHTML = '';

    for (let irow = 0; irow < MASTERROWS; irow++) {
        const CONTAINERROW = document.createElement('div');
        CONTAINERROW.classList.add('container-row');

        const GAMEROW = document.createElement('div');
        GAMEROW.classList.add('decodingboard-row');

        for (let icolumn = 0; icolumn < MASTERCOLUMNS; icolumn++) {
            const GAMECOLUMN = document.createElement('div');
            GAMECOLUMN.classList.add('decodingboard-column');
            GAMEROW.appendChild(GAMECOLUMN);
        }

        const FEEDBACKCONTAINER = document.createElement('div');
        FEEDBACKCONTAINER.classList.add('feedback-container');

        for (let ifeedback = 0; ifeedback < FEEDBACKGRID; ifeedback++) {
            const FEEDBACKCOLUMN = document.createElement('div');
            FEEDBACKCOLUMN.classList.add('feedback-column');
            FEEDBACKCONTAINER.appendChild(FEEDBACKCOLUMN);
        }

        const GUESSBTNCONTAINER = document.createElement('div');
        GUESSBTNCONTAINER.classList.add('guessbtn-container');

        for (let iguessbtn = 0; iguessbtn < GUESSBTN; iguessbtn++) {
            const GUESSCOLUMN = document.createElement('button');
            GUESSCOLUMN.classList.add('guessbtn');
            GUESSBTNCONTAINER.appendChild(GUESSCOLUMN);
            GUESSCOLUMN.textContent = 'Guess'
        }

        CONTAINERROW.appendChild(GAMEROW);
        CONTAINERROW.appendChild(FEEDBACKCONTAINER);
        CONTAINERROW.appendChild(GUESSBTNCONTAINER);
        DECODINGBOARD.appendChild(CONTAINERROW);
    }

    document.querySelectorAll('.decodingboard-column').forEach(column => {
        column.addEventListener('click', clickedPeg);
    });

    document.querySelectorAll('.container-row').forEach((row, idisabled) => {
        if (idisabled !== currentRow) {
            row.classList.add('disabled');
        }
    });

    document.querySelectorAll('.guessbtn').forEach(button => {
        button.addEventListener('click', () => {
            const ROWCHECK = document.querySelectorAll('.container-row');
            const CURRENTROWCHECKER = ROWCHECK[currentRow];

            if (checkGuess(CURRENTROWCHECKER)) {
                moveToNextRow()
            }
        });
    });
}

function generateSecretCode() {
    secretCodeAnswer = [];
    SECRETCODECONTAINER.innerHTML = '';

    for (let secret = 0; secret < MASTERCOLUMNS; secret++) {
        const RANDOMSECRETCODE = COLOURS[Math.floor(Math.random() * COLOURS.length)];
        secretCodeAnswer.push(RANDOMSECRETCODE);

        const SECRETCODEPEG = document.createElement('div');
        SECRETCODEPEG.classList.add('colour-answer');
        SECRETCODEPEG.classList.add('hidden-code');
        SECRETCODEPEG.textContent = '?';
        SECRETCODECONTAINER.appendChild(SECRETCODEPEG);

    }
}

function secretCodeReveal() {
    const SECRETCODEREVEAL = SECRETCODECONTAINER.querySelectorAll('.colour-answer');
    SECRETCODEREVEAL.forEach((seccode, index) => {
        seccode.style.backgroundColor = secretCodeAnswer[index];
        seccode.textContent = '';
        seccode.classList.remove('hidden-code');
    })
}

function colouredBtns() {
    COLOURPEGS.innerHTML = '';

    COLOURS.forEach(colour => {
        const COLOURBTNS = document.createElement('div');
        COLOURBTNS.classList.add('colour-btn');
        COLOURBTNS.style.backgroundColor = colour;

        COLOURBTNS.addEventListener('click', () => {
            document.querySelectorAll('.colour-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            colourPegSelected = colour;
            selectedPeg = COLOURBTNS;
            COLOURBTNS.classList.add('selected');
        })
        COLOURPEGS.appendChild(COLOURBTNS);
    })
}

function clickedPeg(event) {
    if (gameOver) return;

    if (colourPegSelected) {
        event.target.style.backgroundColor = colourPegSelected;
        event.target.classList.add('filled');
        playSound('click');
    }
}

function checkGuess(event) {
    const IFFILLED = event.querySelectorAll('.decodingboard-column');

    if (![...IFFILLED].every(CHECKFILLED => CHECKFILLED.classList.contains('filled'))) {
        generateStatusMessages("Please fill in the row! 😅", 'neutral');
        playSound('rowFailed');
        return false;
    }

    const playerGuesses = [...IFFILLED].map(CHECKFILLED => CHECKFILLED.style.backgroundColor);
    let secretCodeChecker = [...secretCodeAnswer];
    let playerChecker = [...playerGuesses];
    redPegs = 0;
    whitePegs = 0;

    for (let index = 0; index < secretCodeChecker.length; index++) {
        if (playerChecker[index] === secretCodeChecker[index]) {
            redPegs++;
            playerChecker[index] = null;
            secretCodeChecker[index] = null;
        }
    }

    for (let index = 0; index < secretCodeChecker.length; index++) {
        if (playerChecker[index] !== null) {
            const comparisonChecker = secretCodeChecker.findIndex(colour =>
                colour !== null && colour === playerChecker[index]
            );

            if (comparisonChecker !== -1) {
                whitePegs++;
                playerChecker[index] = null;
                secretCodeChecker[comparisonChecker] = null;
            }
        }

    }
    feedbackChecker(event, redPegs, whitePegs);

    if (redPegs === 4) {
        generateStatusMessages("Congrats! You've cracked the code!\nYou win! 😀", 'win');
        playSound('won');
        secretCodeReveal();
        gameOver = true;
        return true
    }

    if (currentRow === 0) {
        generateStatusMessages("You lost! 😔\nBetter luck next time!", 'loss');
        playSound('lost');
        secretCodeReveal();
        gameOver = true;
        return true
    }

    return true
}

function moveToNextRow() {
    const ROW = document.querySelectorAll('.container-row');
    ROW[currentRow].classList.add('disabled');
    currentRow--;

    if (currentRow >= 0 && !gameOver) {
        ROW[currentRow].classList.remove('disabled')

    }
}

function generateStatusMessages(message, status) {
    if (document.getElementById('status-message')) {
        document.getElementById('status-message').remove();
    }

    const STATUSMESSAGES = document.createElement('div')
    STATUSMESSAGES.id = 'status-message';
    document.body.appendChild(STATUSMESSAGES);
    STATUSMESSAGES.innerHTML = message.replace(/\n/g, "<br>");
    STATUSMESSAGES.classList.add(`status-${status}`);

    if (`${status}` === 'neutral') {
        setTimeout(() => {
            STATUSMESSAGES.remove();
        }, 4000)
    } else if (`${status}` === 'win' || `${status}` === 'loss') {

        const RESETGAMEBTN = document.createElement('button');
        STATUSMESSAGES.appendChild(RESETGAMEBTN);
        RESETGAMEBTN.classList.add('reset-btn');
        RESETGAMEBTN.textContent = 'Play Again';

        RESETGAMEBTN.addEventListener('click', () => {
            STATUSMESSAGES.remove();
            currentRow = 9;
            colourPegSelected = null;
            selectedPeg = null;
            gameOver = false;


            DECODINGBOARD.innerHTML = '';
            COLOURPEGS.innerHTML = '';


            decodingBoard();
            generateSecretCode();
        })

    }
}

function feedbackChecker(event, redPegs, whitePegs) {
    const FEEDBACKCONTAINER = event.querySelector('.feedback-container');
    const FEEDBACKPEGS = FEEDBACKCONTAINER.querySelectorAll('.feedback-column');

    for (let index = 0; index < redPegs; index++) {
        FEEDBACKPEGS[index].style.backgroundColor = 'red';
    }

    for (let index = redPegs; index < redPegs + whitePegs; index++) {
        FEEDBACKPEGS[index].style.backgroundColor = 'white';
    }
}

function startGame() {
    STARTGAMEEL.classList.add('hide');
    TITLEDES.classList.add('hide');
    SECRETCODE.classList.remove('hide');
    DECODINGBOARD.classList.remove('hide');
    COLOURPEGS.classList.remove('hide');
    GAMECONTAINER.classList.remove('hide');
    currentRow = 9;
    gameOver = false;
    decodingBoard();
    generateSecretCode();

}

function playSound(type) {
    if (SOUNDS[type]) {
        SOUNDS[type].currentTime = 0;
        SOUNDS[type].volume = 0.1;
        SOUNDS[type].play()
    }
}


/*----------- Event Listeners ----------*/

STARTGAMEEL.addEventListener('click', startGame)

