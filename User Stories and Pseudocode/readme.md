# User Stories

# User Story 1: Page Load
* As a user, when I load the page, I want to see the title of that game, a brief description of how to play, and a clear start button to begin the game.
    * For example:
        * Mastermind
        * Instructions of how to play.
        * Start button

# User Story 2: Start Game
* As a user, after I click start game, I want to be able to see the game board. 
    * Which will include:
        * The game board grid that has 10-12 rows and 4 columns to represent the game and how many guesses I can make.
            * It should also have 4 positions in the secret code spot.
        * I should have 6 different colour "pins" to drop into the grid holes.

# User Story 3: Placing the Pins
* As a user, I should be able to:
    * Place pins into the current active row during my turn. After submitting my guess, the next row should become active.
    * I want audio feedback AND visual feedback for placing a coloured pin in a grid slot so that I know the click action was successful.

# User Story 4: Checking Guess
* There should be a button next to the 4 grid holes to check if my guess is correct.
    * After clicking the button, it should place a red, white OR nothing pins in the "secret code" grid that contains 4 positions.
        * Red = Success for ONE of the colours in the correct spot.
        * White = Success for ONE of the colours but it is IN the wrong spot.
        * Nothing = None of the colours are the right ones for the answer.
    * For example:
        * IF I get one correct AND it is in the right position, then I will see a RED pin in the secret code.
        * IF I get one correct but it is not in the right position, then I will see a WHITE pin in the secret code.
        * IF I select the wrong colour and click the button to check, no pin will be added into the secret code.

# User Story 5: Game Progress
* As a user, I will continue this until I reach the top of the game board OR get all FOUR correct red pins.
    * If I correctly get all FOUR red pins then I will be given a clear message indicating that I have won the game so I can understand the outcome.
    * If I hit the top of the game board without winning then I will be given a clear message indicating that I have lost the game.

# User Story 6: End of Game / Restart Game
* As a user, I want to be able to see a button that will show up and tell me that I am able to restart to try again.
    * Restarting the game will reset the board with a new random secret code.




# User Stories

# Page Load
* As a user, when I load the page, I want to see the title of that game, a brief description of how to play, and a clear start button to begin the game.
    * e.g. Mastermind
    * Instructions of how to play.
    * Start button

# Start Game
* After clicking start game, I want to be able to see the game board. And I should know how to play because the start screen had rules/info on how to play.
* The game board should be a grid that has 10-12 rows and 4 columns to represent the game. It should also have 4 positions in the secret code spot.
* I should be able to see 10-12 grid holes to know how many guesses I have to do before winning or losing.
* I should have 6 different colour "pins" to drop into the grid holes.

# Placing the Pins
* I should be able to click on either coloured pin and place them into only the first grid row on first attempt and then the attempts will move upwards until the end.
* I want audio feedback AND visual feedback for placing a coloured pin in a grid slot.

# Checking Guess
* There should be a button next to the 4 grid holes to check if my colours are right.
* After clicking the button, it should place a red, white OR nothing pins in the "secret code" grid that contains 4 positions.
    * Red = Success for ONE of the colours in the correct spot.
    * White = Success for ONE of the colours but it is IN the wrong spot.
    * Nothing = None of the colours are the right ones for the answer.
*       * e.g IF I get one correct AND it is in the right position, then I will see a RED pin in first slot
*       * IF I get one correct but it is not in the right position, then I will see a WHITE pin in a slot 
*       * IF I select the wrong colour and click the button to check, no pin will be added into the secret code.

# Game Progress
* I will continue this until I reach the top of the game board OR get all FOUR correct red pins.
    * If I correctly get all FOUR red pins then I will be given a clear message indicating that I have won the game so I can understand the outcome.
    * If I hit the top of the game board without winning then I will be given a clear message indicating that I have lost the game.

# End of Game / Restart Game
* As a user, I want to be able to see a button that will show up and tell me that I am able to restart to try again.

Store the game in an array and compare both