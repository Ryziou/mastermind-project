# Mastermind

## Description

This is a browser-based game on the classic code-breaking game called Mastermind. This was created by using HTML, CSS, and JavaScript.

## Deployment link

<LINK>

## Getting Started/Code Installation

Clone this repository to your local machine. Open index.html in a web browser to start playing.

## Timeframe & Working Team (Solo/Pair/Group)

This project started on 31/03/2025 and I have worked solo on this. It was completed on 03/04/2025.

## Technologies Used

### Front End
    - HTML
    - CSS
    - JavaScript
### Development Tools
    - Visual Studio Code
    - Git & GitHub
    - Windows Subsystem for Linux (WSL) with Ubuntu
    - Zsh (Z Shell) + Oh My Zsh
    - Git
    - Node.js & npm
### External websites used for researching or use
[Google]([url](https://www.google.com/))
[MDN Web Docs]([url](https://developer.mozilla.org/en-US/))
[W3Schools]([url](https://www.w3schools.com/))
[Stack Overflow]([url](https://stackoverflow.com/))
[Free Sounds]([url](https://freesound.org/))
[Pixabay]([url](https://pixabay.com/))

## Brief

### MVP
    - Render the game in the browser using the DOM manipulation techniques demonstrated in lecture.
    - Include win/loss logic and render win/loss messages in HTML. The game you chose must have a win/lose condition.
    - Include separate HTML, CSS, JavaScript, and JavaScript data files organized in an appropriate directory structure.
    - Include all required features specific to your game. Game-specific required features are defined in the Required Features column in the table in the Recommended Games document, or as discussed with your instructor.
        Required features:
        - Audio.
        - Playable for one play against a computer creating the code.
        - Once the game has been completed via a win/loss, there should be a prompt to play again.
     - The game is deployed online so that the rest of the world can play it.


## Planning

### Wireframe
![Mastermind Wireframe](https://github.com/Ryziou/mastermind-project/blob/main/Wireframe.png) 
```js
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
```
## Build/Code Process

### Creating The Game Board
One of the core sections was attempting to generate the game board grid by utilising JavaScript rather than hard coding it into HTML.

```js
function decodingBoard() {
    colouredBtns(); // Points towards the colour buttons and to place them in the board.
    DECODINGBOARD.innerHTML = '';

    for (let irow = 0; irow < MASTERROWS; irow++) {
        const CONTAINERROW = document.createElement('div');
        CONTAINERROW.classList.add('container-row');

        // Create the rows and columns of the grid
        const GAMEROW = document.createElement('div');
        GAMEROW.classList.add('decodingboard-row');

        for (let icolumn = 0; icolumn < MASTERCOLUMNS; icolumn++) {
            const GAMECOLUMN = document.createElement('div');
            GAMECOLUMN.classList.add('decodingboard-column');
            GAMEROW.appendChild(GAMECOLUMN);
        }
        // Below would be the row components and appends to the board. This includes stuff like the Feedback column and the guess button.
    }
}
```
This method allowed me to have more flexibility in managing the game state and allowed me to reset the game board when necessary without reloading the page.

### Secret Code Generation
For the secret code, I implemented a computerised generation so that the colours would be randomised and different every time the player attempts to play the game. It will choose colours from the available options in a global array.
```js
const COLOURS = ['red', 'blue', 'green', 'black', 'yellow', 'pink', 'orange', 'purple', 'white']

function generateSecretCode() {
    secretCodeAnswer = []; // Grabs the global array.
    SECRETCODECONTAINER.innerHTML = '';

    for (let secret = 0; secret < MASTERCOLUMNS; secret++) {
        const RANDOMSECRETCODE = COLOURS[Math.floor(Math.random() * COLOURS.length)];
        secretCodeAnswer.push(RANDOMSECRETCODE); // Randomises the colours and then pushes it into the array.

        const SECRETCODEPEG = document.createElement('div'); // Creates 4 peg slots at the top of the game board.
        SECRETCODEPEG.classList.add('colour-answer');
        SECRETCODEPEG.classList.add('hidden-code');
        SECRETCODEPEG.textContent = '?';
        SECRETCODECONTAINER.appendChild(SECRETCODEPEG);

    }
}
```
This function does not only just generate the colours but it will create visual elements later on but for now, it will only show a "?" above the grid. I did run into issues where the player was able to inspect the colours and cheat but I have fixed that.

### Checking Players Guess

```js
function checkGuess(event) {
    // Above code is just to check if the user has filled in all four slots
    const playerGuesses = [...IFFILLED].map(CHECKFILLED => CHECKFILLED.style.backgroundColor);
    // Create a copy of the global arrays to do checks based on how many redPegs or whitePegs the player achieves.
    let secretCodeChecker = [...secretCodeAnswer];
    let playerChecker = [...playerGuesses];
    redPegs = 0;
    whitePegs = 0;

    // First pass: check for exact matches (correct color and position)
    for (let index = 0; index < secretCodeChecker.length; index++) {
        if (playerChecker[index] === secretCodeChecker[index]) {
            redPegs++;
            playerChecker[index] = null;
            secretCodeChecker[index] = null;
        }
    }

    // Second pass: check for color matches (correct color, wrong position)
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
    // Below code is just to determine the winning condition via redPegs and whitePegs.
}
```
This two pass code block checks for exact matches (red pegs) and then for colour only (white pegs). It will then update the global arrays 'redPegs' and 'whitePegs' with the amount that the player has achieved.


## Challenges
### Reset Button Issue
One of the most challenging situations I have encountered was regarding the reset button. Trying to implement it inside the status message's html block was difficult for me. Initially the button wouldn't appear or was super stretched due to the CSS i have done already.

The issue stemmed from how I was handling the game state and DOM manipulation. My original approach was to separate both of them into two different functions:
```js
function generateStatusMessages(message, status) {
    // Create message
    if (`${status}` === 'neutral') {
        setTimeout(() => {
            STATUSMESSAGES.classList.add('hide');
        }, 4000)
    } else if (`${status}` === 'win' || `${status}` === 'loss') {
        resetGame(); // Call separate function
    }
}

function resetGame() {
    // Try to add button to status message
    // But status message reference was lost and it took me a while to figure it out
}
```
I solved this but compacting both of them into one function so that the reset button can easily call the status messages and then I did some CSS work to make it look pretty inside the same pop up block.
### Feedback Checker
Another issue I had was the feedback checker. It originally was going well until the player achieves 1-3 red pegs BUT also manages to collect any amount of white pegs.
```js
function feedbackChecker(event, redPegs, whitePegs) {
    const FEEDBACKCONTAINER = event.querySelector('.feedback-container');
    const FEEDBACKPEGS = FEEDBACKCONTAINER.querySelectorAll('.feedback-column');

    for (let index = 0; index < redPegs; index++) {
        FEEDBACKPEGS[index].style.backgroundColor = 'red';
    }

    for (let index = 0; index < whitePegs; index++) {
        FEEDBACKPEGS[index].style.backgroundColor = 'white';
    }
}
```
This was the original feedback checker function and I was a little bit lost on how to check if red has already been found.

## Wins
### Colour Peg Checker
Successfully implementing the colour matching checker was a significant accomplishment for me. The two pass approach ensures that the feedback is accurate on each guess while avoiding duplicate matches and making sure not to overload the global counter with unnecessary +1's to it.

By always nulling the counter after every time a red/white peg has been found, it would stop the player from cheating by spamming duplicate colours.

    - The first pass identifies exact matches (same colour and same position) and then increases the red peg counter by 1 each time.
    - The second pass identifies colour matches (same colour and NOT same position) and then increases the white peg counter by 1 each time.
    - The nullifier would then delete the copied array each time to prevent double-counting.
This approach will handle scenarios like where the player picks multiple pegs of the same colour and will provide the correct feedback.

## Key Learnings/Takeaways

This project has deepened my understanding of DOM manipulation and event handling in JavaScript. 
    
    - Using JavaScript to build the entire game board taught me more on how to create, modify, and manage DOM elements.
    - More undertanding of event listeners.
    - The implementation of SFX and CSS styling for easy visual representations of what does what.
    - Pseudocode. I wrote a better detailed version for the first time after only learning about it. It helped me see the importance of planning game logic before coding and it did help me figure out what I need to do while I was building this project.
    - I have learnt about User Stories and I have realised that they are a great importance to planning too. 
        - They focus on what the user/player needs
        - Simple and concise descriptions for what the user/player needs and why
User stories are unfortunately very brief with their descriptions but that is what they're for. They are made to allow the team to focus on what is most important for the user/player and allows them to prioritise high-impact features first.


## Bugs

I could not find any more bugs.

## Future Improvements

    - Adding more colours to make it harder.
    - Being able to remove duplicate colours with a toggle button.
    - More sound effects.
    - Button to go back to the main menu instead of refreshing the page.
    - Adding a two player mode.
