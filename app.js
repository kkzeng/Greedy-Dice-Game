// CONSTANTS
const NO_OF_SIDES = 6;
const WINNING_SCORE = 50;

// Keep track of scores
var scores, curRound, activePlayer, gameEnded, prevDiceRoll, dice;

// Initialize the game
initialize();

var diceDOM = document.querySelector('.dice');

// Handle the ROLL button event
document.querySelector('.btn-roll').addEventListener('click', function() {
    // If game is over, don't do anything
    if(gameEnded) return;

    // Display dice
    document.querySelector('.dice').style.display = 'block';

    // Store the previous dice roll
    prevDiceRoll = dice;
    // Roll the dice
    dice = generateRandom();

    // Display the result
    diceDOM.style.display = 'block';
    
    // Change the image to the correct one
    diceDOM.src = 'dice-' + dice + '.png';
    
    // Update score if rolled was not 1
    if(dice === 1) {
        switchPlayer();
    }
    else if(dice === 6 && prevDiceRoll === 6) {
        // Lose entire score
        scores[activePlayer] = 0;
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
        switchPlayer();
    }
    else {
        curRound += dice;
        document.getElementById('current-' + activePlayer).textContent = curRound;
    }
});

// Handle the HOLD button event
document.querySelector('.btn-hold').addEventListener('click', function() {
    // If game is over, don't do anything
    if(gameEnded) return;

    // Add current score to global score
    scores[activePlayer] += curRound;

    // Update UI
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    // Also check if player has won the game
    if(scores[activePlayer] >= WINNING_SCORE) {
        wonGame();
    }
    else {
        // Switch to next round
        switchPlayer();
    }
});

// Handle the NEW GAME button event
document.querySelector('.btn-new').addEventListener('click', initialize);

// HELPER FUNCTIONS
// init function
function initialize() {
    scores = [0,0];
    curRound = 0;
    activePlayer = 0;
    gameEnded = false;

    // 0 acts as unitialized value since values of dice can only be [1,6]
    dice = 0;
    prevDiceRoll = 0;
    
    // Start dice off by displaying nothing
    document.querySelector('.dice').style.display = 'none';
    
    // Initialize scores to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Select correct active player
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

    // Set names for players correctly
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    // Reset winner state
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
}

// Function for random
function generateRandom() {
    return Math.floor(Math.random() * NO_OF_SIDES) + 1;
}

// Reuse function to switch players
function switchPlayer() {
    // Round ended
    curRound = 0;
        
    // Ends round
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    // Change active appearance
    activePlayer = activePlayer === 0? 1: 0;
    document.querySelector('.player-0-panel').classList.toggle('active'); // toggle removes or adds based on if class 'active' is in classlist
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function wonGame() {
    var playerPanelDOM = document.querySelector('.player-' + activePlayer + '-panel');
    diceDOM.style.display = 'none';

    // Set to winner
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    // Add winner class to it so CSS styles it
    playerPanelDOM.classList.add('winner');
    // Remove active
    playerPanelDOM.classList.remove('active');

    // The game has ended
    gameEnded = true;
}