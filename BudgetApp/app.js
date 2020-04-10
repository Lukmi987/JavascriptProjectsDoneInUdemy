//!!! All of the logic encapsulation works coz of closures

//Due to closures an inner func has always access to its parent varia, func even after outer func has returned


// IIFE is simply an anonymous func wrapped in parenthesis
//and it return an object containing all of the funcs that we want to be public, so the funcs we want to give outside scope access to

//So the IIFE returns immedia. and so it's effectively gone but the public test func that we returned here will always has access to the x variable and the add func
/*
var budgetController = (function() { //anonymous func that is immed invoked and in this case it return publicTest mehtod
    
    var x = 23; //x and add are private coz they are in the closure and therefore only the publicTest meth can access them
    
    var add = function(a) {
        return x + a;
    }
    
    return {
        publicTest: function(b) {
            console.log(add(b));
        }
    }
}) (); 

Moduel can accept arguments coz they are just function expressions


*/

var budgetController = (function() { //this func returns publicTest obj
    
    var x = 23; //x and add are private coz they are in the closure and therefore only the publicTest meth can access them
    
    var add = function(a) {
        return x + a;
    }
    
    return {
        publicTest: function(b) {
            return add(b);
        }
    }
}) ();

var UIController = (function () {
    
}) ();


// we will pass other 2 modules as arguments to the controller, so this one know about other 2, and connect them, or we could call them directly coz they are in outer scope but not ideal if we change name of our modules
var controller = (function(budgetCtrl, UICtrl){
    var z = budgetCtrl.publicTest(5);
    
    return {
        anotherPublic: function() {
            console.log(z);
        }
    }
}) (budgetController, UIController);// we pass other 2 modules inside







