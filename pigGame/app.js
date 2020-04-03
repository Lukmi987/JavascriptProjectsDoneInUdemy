/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer;

scores = [0,0];
roundScore = 0;
activePlayer = 0;


// Due to type coercion, JavaScript will convert to 'current-0 or 1',//textContent can just change plain text, no Html, for that we use innerHtml()
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; // on querySelector() we call textContent method

//var x = document.querySelector('#score-0').textContent; // just to read it/ getter

document.querySelector('.dice').style.display = 'none'; // call style() method to change display property(css property and also value)

//in this case we use anonymous func, just to use it here 
//addEventListener has 2 arguments, first arg type of the event, second is the func that will be called asap when event happened but just the name without () because we don't want to called right there, we want event listener to call the func for us 


document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';


// and in that case it is called a call back func because it is not called by us
document.querySelector('.btn-roll').addEventListener('click', function(){
    // 1. Random number
   var dice = Math.floor(Math.random() * 6) +1;
    
    //2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    
    
    //3. Update the round score If the rolled number is not  1
    if (dice != 1){
        roundScore = dice;
        //scores[0] += roundScore; 
        document.getElementById('current-' + activePlayer).textContent = dice;
    }
}); 