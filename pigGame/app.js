/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying,previousRoll;

//winningNumber = prompt("Please enter the winning value of the game");


initialize();

// Due to type coercion, JavaScript will convert to 'current-0 or 1',//textContent can just change plain text, no Html, for that we use innerHtml()
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; // on querySelector() we call textContent method

//var x = document.querySelector('#score-0').textContent; // just to read it/ getter

// we use anonymous func, just to use it here 
//addEventListener has 2 arguments, first arg type of the event, second is the func that will be called asap when event happened but just the name without () because we don't want to called right there, we want event listener to call the func for us 

// and in that case it is called a call back func because it is not called by us
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){ // prevent the player keep playing when he wins the game
        // 1. Random number
   var dice = Math.floor(Math.random() * 6) +1;
   var dice1 = Math.floor(Math.random() * 6) +1;
    
    var diceDOM = document.querySelector('.dice');
    var dice1DOM = document.querySelector('.dice1');    
    diceDOM.style.display = 'block';
    dice1DOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    dice1DOM.src = 'dice-' + dice1 + '.png';
    
   
    //3. Update the round score If the rolled number is not  1
    if( dice === 6 && previousRoll === 6){
         scores[activePlayer] = 0;
         document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();         
    } else {
        
        if (dice !== 1 || dice1 !== 1){ 
        roundScore += dice + dice1;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else { //if we rolled 1 this block of code happens
        //Next player
        nextPlayer();
    }
 }
    previousRoll = dice;        
}
}); 

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying){ 
    //Add Current score to GLOBAL score
    scores[activePlayer] += roundScore;
    
    //Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
    var input = document.querySelector('.final-score').value;
    var winnigScore;
    // Undefined, 0, null or '' are Coerced to false
        if(input){ 
            winnigScore = input;
        } else {
            winnigScore = 100;
        }
    //check if the player won the game
    if(scores[activePlayer] >= winnigScore){
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice1').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');// accessing the class which we'd defined in css
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    } else{  
    //Next player
    nextPlayer();
    }
 }
});


function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // set the current player
        roundScore = 0;
        
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        //as a reference better way is to use toggle
        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');
        
        document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click',initialize); //if init() it would be immediately called, but we want to be call it by eventListener func

function initialize(){
scores = [0,0];
roundScore = 0;
activePlayer = 0;
gamePlaying = true;
document.querySelector('.dice').style.display = 'none'; // call style() method to change display property(css property and also value)
document.querySelector('.dice1').style.display = 'none';
    
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('name-0').textContent = 'Player1';
document.getElementById('name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active'); //to be sure we do not have left any active classes , do not want to end up with 2 active classes
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
}