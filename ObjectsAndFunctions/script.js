//var Person = function(name,yearOfBirth,job) { // for func constructor we use first letter capital
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
//
//var john = new Person('John', 1990, 'teacher');
//john.calculateAge();
//

//Object.create allow us directly specify which object should be proto.
//Difference between Object.create and the func constructor pattern is that object.create builds an object that inherits directly from the one that we passed in the first argument

//The func construc the newly created object inherits from the constructor's prototype property
var personProto = {
    calculateAge: function(){
        console.log(2016 - this.yearOfBirth);
    }
    
}

var john = Object.create(personProto);
john.name ='John';
john.job = 'teacher';

//or we can do it as a second parametr
//jane and john will share same prototype of personProto
var jane = Object.create(personProto, 
    {
   name:{ value: 'Jane'},
   yearOfBirth: {value: 1969},
    job: { value: 'designer'}
});