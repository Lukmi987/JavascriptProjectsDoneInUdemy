/////////////////////////////////
// Lecture: let and const

/*
// ES5
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
console.log(name5);

// ES6
const name6 = 'Jane Smith';
let age6 = 23;
name6 = 'Jane Miller';
console.log(name6);


// ES5
function driversLicence5(passedTest) {
    
    if (passedTest) {
        console.log(firstName);
        var firstName = 'John';
        var yearOfBirth = 1990;
    }
    
    
    console.log(firstName + ', born in ' + yearOfBirth + ', is now officially allowed to drive a car.');
}

driversLicence5(true);


// ES6
function driversLicence6(passedTest) {
    
    //console.log(firstName);
    let firstName;
    const yearOfBirth = 1990;
    
    if (passedTest) {
        firstName = 'John';
    }
    
    console.log(firstName + ', born in ' + yearOfBirth + ', is now officially allowed to drive a car.');
}

driversLicence6(true);



var i = 23;

for (var i = 0; i < 5; i++) {
    console.log(i);
}

console.log(i);
*/

////////////////////////////////
// Lecture: Blocks and IIFEs

/*
// ES6
{
    const a = 1;
    let b = 2;
    var c = 3;
}

//console.log(a + b);
console.log(c);


// ES5
(function() {
    var c = 3;
})();

//console.log(c);
*/


////////////////////////////////
// Lecture: Strings

/*
let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
    return 2016 - year;
}

// ES5
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.');

// ES6
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today, he is ${calcAge(yearOfBirth)} years old.`);


const n = `${firstName} ${lastName}`;
console.log(n.startsWith('j'));
console.log(n.endsWith('Sm'));
console.log(n.includes('oh'));
console.log(`${firstName} `.repeat(5));
*/


////////////////////////////////
// Lecture: Arrow functions

/*
const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function(el) {
    return 2016 - el;
});
console.log(ages5);


// ES6
let ages6 = years.map(el => 2016 - el);
console.log(ages6);

ages6 = years.map((el, index) => `Age element ${index + 1}: ${2016 - el}.`);
console.log(ages6);

ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1}: ${age}.`
});
console.log(ages6);
*/


//ES5
//this keyword is not going to work, in this case it points to global object
//var box5 = {
//    color: 'green',
//    position: 1,
//    clickMe: function() {
//    document.querySelector('.green.').addEventListener('click',function(){
//           var str = 'this is a box' + this.color;
//        });
//                                                                             
//}
//    
//ES6    
//ES6 solution for this keyword arrow func instead of anonymous fun
//const box5 = {
//    color: 'green',
//    position: 1,
//    clickMe: function() { //if we  have  more then one argument we have to specify ()
//    document.querySelector('.green').addEventListener('click', () => { //good it points to clickMe func
//           var str = 'this is a box' + this.color;
//        alert(str);
//        });
//    }    
//}
//box5.clickMe();
//
//
//!!!!!!!!!!!!!! now it is not going to work  coz it points to global object of this keyword
//const box5 = {
//    color: 'green',
//    position: 1,
//    clickMe: () => { //if we  have  more then one argument we have to specify ()
//    document.querySelector('.green').addEventListener('click', () => {
//           var str = 'this is a box' + this.color;
//        alert(str);
//        });
//    }    
//}


//ES5

//By default, the 'this' inside callbacks passed to event listeners, refers to the element, on which the event was captured. When you bind a different 'this', the original value is lost.
//
//With self there is no problem because there are two separate variables - original this and self.

//function Person(name) {
//    this.name = name;
//}
//
//Person.prototype.myFriends =
//    fucntion(friends){
//    var arr = friends.map(function(el){
//       return this.name + ' is friends with' + el; 
//    }.bind(this)); // now it points Person object
//    console.log(arr);
//}
//
//var friends = ['Bob', 'jane', 'Mark'];
//new Person('John').myFriends(friends);
//
////////////////////////////////////////////////////
//function Person(name) {
//    this.name = name;
//}
//
//Person.prototype.myFriends =
//    function(friends){    
//    var arr = friends.map(el => 
//        `${this.name} is friends with' ${el}`); 
//     
//    console.log(arr);
//};
//
//var friends = ['Bob', 'jane', 'Mark'];
//new Person('Mike').myFriends(friends);
/////////////////////////////////////////////////////////////////////

//Lecutre: Destructuring


/*
// ES5
var john = ['John', 26];
//var name = john[0];
//var age = john[1];


// ES6
const [name, age] = ['John', 26];
console.log(name);
console.log(age);

const obj = {
    firstName: 'John',
    lastName: 'Smith'
};

const {firstName, lastName} = obj;
console.log(firstName);
console.log(lastName);

const {firstName: a, lastName: b} = obj;
console.log(a);
console.log(b);



function calcAgeRetirement(year){
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}


const [age2, retirement]= calcAgeRetirement(1991);
console.log(age2);
console.log(retirement);
*/

////////////////////// 
//Lecture Arrays


const boxes = document.querySelectorAll('.box'); //returns a nodeList
console.log(boxes);
//ES5

///With call(), an object can use a method belonging to another object.
var boxesArr = Array.prototype.slice.call(boxes);
//boxesArr.forEach(function(cur){
//    cur.style.background = 'dodgerblue';
//});
//console.log(boxesArr);

//ES6
//from() transfer nodeList to array
//const boxesArr6 = Array.from(boxes);

//Array.from(boxes).forEach( cur => cur.style.backgroundColor = 'dodgerblue');


//ES5
/*
for(var i = 0; i < boxesArr.length; i++){
   if(boxesArr[i].className === 'box blue'){
       continue; //will skip the iteration
   }
    
    boxesArr[i].textContent = 'I chanched to blue';
}
*/

//ES6
/*
for(const cur of boxesArr){
    if(cur.className.includes('blue')){
        continue;
    }
    cur.textContent = 'I changed to blue';
}


//ES5
var ages = [12,17,8,21,14,11,25,26];
var full = ages.map(function(cur){
    return cur >= 18;
});
console.log(full);

console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);


//ES6
find index of the elelement that is greater than 18
ages.findIndex((cur => cur >= 18));

//to find the value that is greater than 18
console.log(ages.find(cur => cur >=18));

*/

/////////////////////////////////
// Lecture: Spread operator

//ES5

function addFourAges(a,b,c,d){
    return a + b + c + d;
}
var sum = addFourAges(18,30,20,21);
var ages = [18,30,12,21];

var sum2 = addFourAges.apply(null, ages); //use the ages array as arguments

console.log(sum2);

/// ES6

const max3 = addFourAges(..ages); //new spread operator

const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bigFamily = [...familySmith, 'Lily', ...familyMiller];
console.log(bigFamily);

const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
const all = [h, ..boxes];

//nodelist to array
Array.from(all).forEach( cur => cur.style.color = 'purple');





                                                             
