//Budget Controller
var budgetController = (function(contrl) { 
contrl.publicTest;
}) (controller);


//UI Controller
var UIController = (function () {
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn' 
    };
    
    return {
        getInput: function() { // will be either inc or exp the value
            return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        getDOMstrings: function() {
            return DOMstrings;
        }
    }
}) ();


//Global App controller, we contral other modules and call mehtods
var controller = (function(budgetCtrl, UICtrl){
    var DOM = UICtrl.getDOMstrings(); 
    var input;
    var ctrlAddItem = function(){         
        //1. Get the field input data
        input = UICtrl.getInput()
        console.log(input);
        
    //2. Add the item to the budget  controller
    
    // 3. Add the item to the UI
    
    // 4. Calculate the budget 
    
    // 5. Display the budget on the UI
     
    }
  document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem); 
        
    //event gets automatically passes by browser to our event listener
    document.addEventListener('keypress', function(event) {
        //which for older browsers
        if(event.keyCode === 13 || event.which === 13){
           ctrlAddItem();
        }
    });

       return{ 
        publicTest: function (){
            return input;
        }
    }
}) (budgetController, UIController);

