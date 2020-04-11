//Budget Controller
var budgetController = (function() { 
    
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
 
    
    var data =  {
        allItems: { 
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };
    
    return{
        addItem: function(type,des, val) {
            var newItem,ID;
            
            //(Create new ID!!)Select the last element + 1 whe will  be new one stored
          if(data.allItems[type].length > 0){ 
             ID = data.allItems[type][data.allItems[type].length -1].id + 1;
            }else {
                ID =0;
            }
            
            //Create new item based on 'inc' or 'exp' type
            if(type === 'exp'){ 
              newItem = new Expense(ID, des, val)
            } else if(type ==='inc'){
              newItem = new Income(ID, des, val)
            }
            
            //Push it into our data structure
            data.allItems[type].push(newItem);
            
            //Return the new element
            return newItem;// for other modules to have access
        },
    testing: function(){
        console.log(data);
    }
    };
    
}) ();



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
    
    var setUpEventListeners =   function() {
        var DOM = UICtrl.getDOMstrings(); 
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem); 
        
    //event gets automatically passes by browser to our event listener
    document.addEventListener('keypress', function(event) {
        //which for older browsers
        if(event.keyCode === 13 || event.which === 13){
           ctrlAddItem();
        }
    });
} // setUpEventListeners()
    
var ctrlAddItem = function(){         
    var input, newItem;
    //1. Get the field input data
    input = UICtrl.getInput();
        
    //2. Add the item to the budget  controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    // 3. Add the item to the UI
    
    // 4. Calculate the budget 
    
    // 5. Display the budget on the UI
     
}; // ctrlAdditem ()

return {
     init: function() {
      setUpEventListeners();   
     }
    
    };

    
}) (budgetController, UIController);


controller.init();
