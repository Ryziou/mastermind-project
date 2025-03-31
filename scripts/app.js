// * Pseudocode for Mastermind

//? Page loads and shows start menu
    // Title
    // Description of the game/How to play
    // Start button
        // CLICK listener
        // HIDE description of game/How to play

//? Start Game
    // IF start game is clicked
        // Grid shows 10-12 rows and 4 column for guesses
        // Secret code area for results
        // 6 coloured pins to use
        // Check/Guess button

//? Placing Pins
    // IF user clicks a coloured pin
        // Cursor element to show holding the pin
    // IF user places the pin in an available grid slot
        // Place pin and remove cursor element
    // IF user CLICKS check/guess BUTTON
        // IF all four grid slots are not filled
            // Display message to complete the row first
        // IF all four grid slots ARE filled
            // Display secret code results

//? Secret Code / Guesses
    // For each pin placed
        // IF a colour AND position are correct => 
            // RETURN red pin
        // ELSE IF colour is correct BUT position is wrong =>
            // RETURN white pin
        // ELSE
            // RETURN show nothing
    

//? Game Progress
    // IF user gets 4 red pins
        // Display win message
    // ELSE IF user reaches last row without winning
        // Display loss message


//? Game End / Restart
    // Show result text (win or loss) (.textContent)
    // Display "Restart" BUTTON
        // CLICK event listener to reset the game and generate a new math.random secret code




/*-------------- Constants -------------*/
const MASTERROWS = 10
const MASTERCOLUMNS = 4
const COLOURS = ['red', 'blue', 'green', 'black', 'yellow', 'pink']
const FEEDBACK = ['red', 'white']
const FEEDBACKGRID = 4
const TOTALFEEDBACKGRID = MASTERROWS * FEEDBACKGRID

/*---------- Variables (state) ---------*/

let colourPegSelected 
let selectedPeg
let secretCodeAnswer = []

/*----- Cached Element References  -----*/
const PLAYAGAINBTN = document.querySelector('#play-again-button')
const STARTGAMEEL = document.querySelector('#start-game-again')
const TITLEDES = document.querySelector('#title-description')
const DECODINGBOARD = document.querySelector('#master-gameboard')
const COLOURPEGS = document.querySelector('#colour-pegs')
const SECRETCODE = document.querySelector('#secret-code')
const SECRETCODECONTAINER = document.querySelector('#secret-code-pegs')

/*-------------- Functions -------------*/

function decodingBoard() {
    colouredBtns();

    for (let irow = 0; irow < MASTERROWS; irow++) {
        const GAMEROW = document.createElement('div');
        GAMEROW.classList.add('decodingboard-row');


        for (let icolumn = 0; icolumn < MASTERCOLUMNS; icolumn++) {
            const GAMECOLUMN = document.createElement('div');
            GAMECOLUMN.classList.add('decodingboard-column');
            GAMEROW.appendChild(GAMECOLUMN);
        }
        DECODINGBOARD.appendChild(GAMEROW);
    }

        document.querySelectorAll('.decodingboard-column').forEach(column => {
            column.addEventListener('click', clickedPeg);
        });
}

function generateSecretCode() {
    secretCodeAnswer = [];
    SECRETCODECONTAINER.innerHTML = '';

    for (let secret = 0; secret < MASTERCOLUMNS; secret++) {
        const randomSecretCode = COLOURS[Math.floor(Math.random() * COLOURS.length)];
        secretCodeAnswer.push(randomSecretCode);

        const secretCodePeg = document.createElement('div');
        secretCodePeg.classList.add('colour-answer');
        secretCodePeg.style.backgroundColor = randomSecretCode;
        SECRETCODECONTAINER.appendChild(secretCodePeg);
        
    }
}

function colouredBtns() {
    COLOURS.forEach(colour => {
        const COLOURBTNS = document.createElement('div');
        COLOURBTNS.classList.add('colour-btn');
        COLOURBTNS.style.backgroundColor = colour;

        COLOURBTNS.addEventListener('click', () => {
            colourPegSelected = colour;
            selectedPeg = COLOURBTNS;
            COLOURBTNS.classList.add('selected');
        })
            COLOURPEGS.appendChild(COLOURBTNS);
    })
}

function clickedPeg(event) {
    if (colourPegSelected) {
        event.target.style.backgroundColor = colourPegSelected;
        event.target.classList.add('filled');
        selectedPeg.classList.remove('selected');
        selectedPeg = null;
        colourPegSelected = null;
    }
}

function startGame() {
    STARTGAMEEL.classList.add('hide');
    TITLEDES.classList.add('hide');
    SECRETCODE.classList.remove('hide')
    DECODINGBOARD.classList.remove('hide')
    COLOURPEGS.classList.remove('hide')
    decodingBoard()
    generateSecretCode()

}

function resetGame() {

}


/*----------- Event Listeners ----------*/

PLAYAGAINBTN.addEventListener('click', resetGame)
STARTGAMEEL.addEventListener('click', startGame)
