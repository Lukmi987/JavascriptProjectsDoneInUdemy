//var Person = function(name,yearOfBirth,job) { // for func constructor we use first letter capital, a good practice,
//sometime we need a blueprint for creating objects of the same type
//    this.name = name;
//    this.yearOfBirth = yearOfBirth;
//    this.job = job;
//    //this.calculateAge = function(){
//      //  console.log(2016 - this.yearOfBirth);
//    //;
//}
//
////prototype is simple a property of func construc., the method is not define in the Person constructor but we can still use it because it's in the prototype property of our func constructor, inheritence in practice :D
//Person.prototype.calculateAge = function(){
//       console.log(2016 - this.yearOfBirth)
//} 
// objects of the same type are created calling constr. func with the new keyword
//var john = new Person('John', 1990, 'teacher');
//john.calculateAge();
//

//Object.create allow us directly specify which object should be proto.
//Difference between Object.create and the func constructor pattern is that object.create builds an object that inherits directly from the one that we passed in the first argument

//The func construc the newly created object inherits from the constructor's prototype property
//var personProto = {
//    calculateAge: function(){
//        console.log(2016 - this.yearOfBirth);
//    }
//    
//}
//
//var john = Object.create(personProto);
//john.name ='John';
//john.job = 'teacher';
//
////or we can do it as a second parametr
////jane and john will share same prototype of personProto
//var jane = Object.create(personProto, 
//    {
//   name:{ value: 'Jane'},
//   yearOfBirth: {value: 1969},
//    job: { value: 'designer'}
//});


//Primitives vs objects

//var obj1 = {
//    name: 'John',
//    age: 26
//};
//
//var obj2 = obj1;
//obj1.age = 30;
//console.log(obj1.age);
//console.log(obj2.age);
////result is 30 for both, because in obj2 is stored a referance for obj1 
//
////Functions
//var age = 28;
//var obj = {
//    name: 'Lukas',
//    city: 'Lisbon'
//};
//
//
////when we pass a primit into func a simple copy is created but it will never affect the variable outside
//
//function change(a,b){ // mutate the data
//    a = 30; // not changing to 30 , primitive type still 28
//    b.city = 'Berlin'; // refer changes from Lisbon to Berlin
//}
//
//// we do not pass an object into a function but only the reference that points to the object, so it is reflected outside
//change(age,obj);
//
//console.log(age);// it is still 28
//console.log(obj.city); // we change the referance to Berlin



/////////////////////////////////////////////////////////
// Lecture: Passing Functions as arguments

//var years = [1990, 1995,1998,2005];
//
//function arrayCalc(arr, fn){ // a generic func
//    var arrRes =[];
//    for(var i = 0; i < arr.length; i++){
//        arrRes.push(fn(arr[i]));
//    } 
//    return arrRes;
//}
//
//function calcAge(el){
//    return 2016 - el;
//}
//
//function issFullAge(el){
//    return el >= 18;
//}
//
//function maxHeartRate(el){
//    if(el >= 18 && el <= 81){ 
//    return Math.round(206.9 - (0.67 * el));
//    } else {
//        return -1;
//    }
//}
//
////calcAge withou parametr we do not wan to call it immediately but inside for loop, a callback func
//var ages = arrayCalc(years, calcAge); 
//var fullAges = arrayCalc(ages, issFullAge);
//var heartRate = arrayCalc(ages, maxHeartRate);
//console.log(ages);
//console.log(fullAges);
//console.log(heartRate);

/////////////////////////////////////////////////////////////

//Lecture: Functions returning funcs/ First Class functions
//
//function interviewQuestion(job){
//   if (job === 'designer'){
//       return function(name){ //anonymous func, we return simply object that happens to be a func
//       console.log(name + ',Wha UX is ?');
//       }
//   } else if (job === 'teacher'){
//        return function(name){ //anonymous func
//       console.log(name + ',Wha UX is ?');
//       }
//   } else {
//      return function(name){
//        console.log('What do you do' + name);
//       }
//   } 
//}
//
//var teacherQuestion = interviewQuestion('teacher ');
//var designerQuestion = interviewQuestion('designer');
//console.log(teacherQuestion('Lukas'));
//designerQuestion('Mark');
//
//interviewQuestion('teacher')('Mark') //evaluated from left to right

//////////////////////////////////////////////
//Immediately Invoked Function Expression

//IIFE function and to get Data privacy

//(function (goodLuck) { // it willl treat it as func expression not decleration
//    var score = Math.random() * 10;
//    console.log(score >= 5 - goodLuck);
//})(5);

////////////////////////////////////////////////////
////Lecture: Closures

// function retirement(retirementAge){
//     var a = ' years left until retirement.';
//     return function(yearOfBirth){
//         var age = 2016 - yearOfBirth;
//         console.log((retirementAge - age) + a);
//     }
// }
//
//var retirementsUS =retirement(66);//  a variable object of retirement() func is stored in retirementsUS
//var retirementGermany = retirement(65);
//
//retirementGermany(1993);
//retirementsUS(1990);
//
//retirement(66)(1990);
//
////
////function interviewQuestion(job){
////   if (job === 'designer'){
////       return function(name){ //anonymous func, we return simply object that happens to be a func
////       console.log(name + ',Wha UX is ?');
////       }
////   } else if (job === 'teacher'){
////        return function(name){ //anonymous func
////       console.log(name + ',Wha UX is ?');
////       }
////   } else {
////      return function(name){
////        console.log('What do you do' + name);
////       }
////   } 
////}
//
//function interviewQuestion(job){
//    return function(name){
//        if ( job === 'designer'){
//            console.log(name + ',Wha UX is ?');
//        }else if (job === 'teacher'){
//            console.log('What subject do you teach,' + name + '?');
//        } else {
//          console.log('What do you do' + name);
//        }
//    }
//}
//
//interviewQuestion('teacher')('John');// in the first call we return  whole return func(name), and then we call that func with John argument, and then this execution context will close in over the variable object of the function that we had called before, So it will close in on the variables that we defined in the old func
//
/////////////////////////////////////////////////////////////////////////////////
//Lecture: Bind, call and apply

var john = {
    name: 'JOhn',
    age: 26,
    job: 'teacher',
    presentation: function(style,timeOfDay){
        if (style === 'formal'){
            console.log('Good' + timeOfDay + ' ,Ladies and gentlemen! I am ' + this.name + ' I am ' + this.job + ' and Iam ' + this.age + ' years old.');
        } else if( style === 'friendly') {
            console.log('Hey whats upp' + timeOfDay + ' My name ' + this.name);
        }
    } 
};

var emily = {
    name: 'Emily',
    age: 36,
    job: 'designer'
};
john.presentation('formal','morning');

//call method allow us to set this variable in first argument
john.presentation.call(emily, 'formal', 'afternoon'); //method borrowing

//same like call but accept 2 argument, this and an array, but in this case it's not going to work
//john.presentation.apply(emily, ['friendly', 'afternoon']);

//Bind  method does not immedia call a func but it creates a copy so we can store it somewhere, so it returns a function
//first argument this variable
var johnFriendly = john.presentation.bind(john, 'friendly');

//we have some preset parameters already useful
johnFriendly('morning');
johnFriendly('night');

var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('afternoon');

var years = [1990, 1995,1998,2005];

function arrayCalc(arr, fn){ // a generic func
    var arrRes =[];
    for(var i = 0; i < arr.length; i++){
        arrRes.push(fn(arr[i]));
    } 
    return arrRes;
}

function calcAge(el){
    return 2016 - el;
}

function issFullAge(limit, el){
    return el >= limit;
}

var ages = arrayCalc(years, calcAge);

//issFullAge.bind now we can preset the argument,
//this keyword always first, in this case we do not care about it, second our limit
//to arrayCalc will be passed a copy of isFull function

var fullJapan = arrayCalc(ages, issFullAge.bind(this, 20));
console.log(ages);
console.log(fullJapan);