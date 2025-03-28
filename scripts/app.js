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
const TOTALGRID = MASTERCOLUMNS + MASTERROWS
const COLOURS = ['red', 'blue', 'green', 'black', 'yellow', 'pink']
const PLAYAGAINBTN = document.querySelector('#play-again')
const FEEDBACK = ['red', 'white']

/*---------- Variables (state) ---------*/


/*----- Cached Element References  -----*/


/*-------------- Functions -------------*/

function decodingBoard() {
    for (let index = 0; index < TOTALGRID; index++) {
        const grid = document.createElement('div');
        
    }
}

function resetGame() {

}

/*----------- Event Listeners ----------*/

PLAYAGAINBTN.addEventListener('click', resetGame())