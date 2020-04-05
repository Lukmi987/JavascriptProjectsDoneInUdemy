var Person = function(name,yearOfBirth,job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    //this.calculateAge = function(){
      //  console.log(2016 - this.yearOfBirth);
    //;
}

//prototype is simple a property of func construc., the method is not define in the Person constructor but we can still use it because it's in the prototype property of our func constructor, inheritence in practice :D
Person.prototype.calculateAge = function(){
       console.log(2016 - this.yearOfBirth)
} 

var john = new Person('John', 1990, 'teacher');
john.calculateAge();
