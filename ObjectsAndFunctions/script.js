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

var obj1 = {
    name: 'John',
    age: 26
};

var obj2 = obj1;
obj1.age = 30;
console.log(obj1.age);
console.log(obj2.age);
//result is 30 for both, because in obj2 is stored a referance for obj1 

//Functions
var age = 28;
var obj = {
    name: 'Lukas',
    city: 'Lisbon'
};


//when we pass a primit into func a simple copy is created but it will never affect the variable outside

function change(a,b){ // mutate the data
    a = 30; // not changing to 30 , primitive type still 28
    b.city = 'Berlin'; // refer changes from Lisbon to Berlin
}

// we do not pass an object into a function but only the reference that points to the object, so it is reflected outside
change(age,obj);

console.log(age);// it is still 28
console.log(obj.city); // we change the referance to Berlin