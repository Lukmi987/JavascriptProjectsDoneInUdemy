//to make sure all code is private and does not interfere with the other programmers code we use //Immediately Invoked Function Expression
/*
(function() {
  

Question = function(question,answers,correct){ 
    this.question = question;
    this.answers = answers;
    this.correct = correct;
     //not good to write method to its object, because then all of the three questions would have that method attached to them
}


Question.prototype.displayQuestion = function(){ 
    console.log(this.question);  
    for(var i = 0; i< this.answers.length; i++){
        console.log(i + ' ' + this.answers[i]);// i our counting variable');
    }
}

Question.prototype.checkAnswer = function (userAnsw) {
    if(this.correct === userAnsw){
    console.log('that is right ');
} else {
    console.log('Sorry wrong');
}
}



var q1 = new Question('Is javascript the coolest language in the world?',['Yes', 'No'],0);


var q2 =  new Question('What is the name of our teacher?',['Erik', 'JOh','Jonas'],2);

var q3 = new Question('What bst describes coding?',['Boring','Hard','Fun'], 2);

var questions = [q1,q2,q3]

var randomNumber = Math.floor(Math.random() * questions.length);
questions[randomNumber]

//better to write the method to Question prototype property, which is the prototype of all the instances , so all of the objects created through it

questions[randomNumber].displayQuestion();
var UserAnswer = parseInt(prompt('Write the correct answer as number'));
questions[randomNumber].checkAnswer(UserAnswer);

})();

*/

//expert level of our coding challlenge


(function() {


Question = function(question,answers,correct){ 
    this.question = question;
    this.answers = answers;
    this.correct = correct;
     //not good to write method to its object construc, because then all of the three questions would have that method attached to them
}


Question.prototype.displayQuestion = function(){ 
    console.log(this.question);  
    for(var i = 0; i< this.answers.length; i++){
        console.log(i + ' ' + this.answers[i]);// i our counting variable');
    }
}

Question.prototype.checkAnswer = function (userAnsw,callback) {
    var count = 0;
    var sc;
    if(this.correct === userAnsw){
    console.log('that is right ');
       sc = callback(true);
} else {
    console.log('Sorry wrong');
    sc = callback(false); // i need to return current value if i don't it would be undefined
 }
    this.displayScore(sc);
}

//method which is going to diplay the score in the console
Question.prototype.displayScore = function(score) {
    console.log('Your current socre is: ' + score);
    console.log('-------------------------------');
}

var q1 = new Question('Is javascript the coolest language in the world?',['Yes', 'No'],0);


var q2 =  new Question('What is the name of our teacher?',['Erik', 'JOh','Jonas'],2);

var q3 = new Question('What bst describes coding?',['Boring','Hard','Fun'], 2);

    var questions = [q1,q2,q3];
    //we use Closure to keep the score variable
    function score(){
        var sc = 0; //in each call of callback sc + 1
        return function(correct) {
            if(correct){
                sc++;
            }
            return sc;
        }
    }
    
    var keepScore = score(); //variable now holds a reference to inside fun


    
    function newQuestion() {
      
       var randomNumber = Math.floor(Math.random() * questions.length);
        questions[randomNumber].displayQuestion();
        var UserAnswer = prompt('Write the correct answer as number');
       //parseInt we move after if statement we want to comapere string there
        
        if(UserAnswer  !== 'exit'){ 
             questions[randomNumber].checkAnswer(parseInt(UserAnswer),keepScore);
             newQuestion();
        }
    }
   
 newQuestion();


})();
