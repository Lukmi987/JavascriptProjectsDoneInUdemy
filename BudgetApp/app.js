//Budget Controller
var budgetController = (function() { 

}) ();


//UI Controller
var UIController = (function () {
    
}) ();


//Global App controller
var controller = (function(budgetCtrl, UICtrl){
    var ctrlAddItem = function () {
    //1. Get the field input data
    
    //2. Add the item to the budget  controller
    
    // 3. Add the item to the UI
    
    // 4. Calculate the budget 
    
    // 5. Display the budget on the UI
        console.log('work');
    }
    
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem); 
        
    
    
    //event gets automatically passes by browser to our event listener
    document.addEventListener('keypress', function(event) {
        //which for older browsers
        if(event.keyCode === 13 || event.which === 13){
           ctrlAddItem();
        }
    });
    
}) (budgetController, UIController);

