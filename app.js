// CONSTANTS
const NO_OF_SIDES = 6;
const DEFAULT_SCORE_LIMIT = 50;

// Keep track of scores
var scores, curRound, activePlayer, gameEnded, prevDiceRoll, dice1, dice2;

var diceDOM1 = document.querySelector('.dice1');
var diceDOM2 = document.querySelector('.dice2');

// Initialize the game
initialize();

// Handle the ROLL button event
document.querySelector('.btn-roll').addEventListener('click', function() {
    // If game is over, don't do anything
    if(gameEnded) return;

    // Store the previous dice roll
    prevDiceRoll1 = dice1;
    prevDiceRoll2 = dice2;
    // Roll the dice
    dice1 = generateRandom();
    dice2 = generateRandom();

    // Display the result
    diceDOM1.style.display = 'block';
    diceDOM2.style.display = 'block';
    
    // Change the image to the correct one
    diceDOM1.src = 'dice-' + dice1 + '.png';
    diceDOM2.src = 'dice-' + dice2 + '.png';
    
    // If either dice is 1, end game
    if(dice1 === 1 || dice2 === 1) {
        switchPlayer();
    }
    else if((dice1 === 6 && prevDiceRoll1 === 6) || (dice2 == 6 && prevDiceRoll2 === 6)) {
        // Lose entire score
        scores[activePlayer] = 0;
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
        switchPlayer();
    }
    else {
        curRound += (dice1 + dice2);
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
    if(scores[activePlayer] >= getScoreLimit()) {
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
    dice1 = 0;
    dice2 = 0;
    prevDiceRoll1 = 0;
    prevDiceRoll2 = 0;
    
    // Start dice off by displaying nothing
    diceDOM1.style.display = 'none';
    diceDOM2.style.display = 'none';
    
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
    diceDOM1.style.display = 'none';
    diceDOM2.style.display = 'none';

    // Set to winner
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    // Add winner class to it so CSS styles it
    playerPanelDOM.classList.add('winner');
    // Remove active
    playerPanelDOM.classList.remove('active');

    // The game has ended
    gameEnded = true;
}

function getScoreLimit() {
    var scoreLimit = document.querySelector('#score-field').value;
    if(scoreLimit) {
        return parseInt(scoreLimit);
    }
    else {
        return DEFAULT_SCORE_LIMIT;
    }
}