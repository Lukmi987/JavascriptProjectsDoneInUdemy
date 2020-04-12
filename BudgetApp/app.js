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
    
    var calculateTotal = function(type){
      var sum = 0;
        data.allItems[type].forEach(function(currEle){
           sum += currEle.value; //we called it value 
        });
        data.totals[type] = sum;
    };
    
    var data =  {
        allItems: { 
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1 // -1 coz something is not existant at this point
        
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
        
        deleteItem: function(type, id) {
            var ids, index;
            // ids = [1 2 4 6 8]
            // we have to loop through our elements coz ids don't have to match their  indexes coz we can delete items, map returns new array
            ids = data.allItems[type].map(function(current){
                return current.id; // returns all ids to new array                
            });
            
            index = ids.indexOf(id);// return index number of the element
            
            if(index !== -1){
                //The splice() method adds/removes items to/from an array, and returns the removed item(s)
                data.allItems[type].splice(index, 1);
            }
        },
        
        calculateBudget: function() {
            //calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            //Calcul the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            //Calcul the percentage of income that we spent
            if(data.totals.inc > 0){ 
            data.percentage = Math.round((data.totals.exp / data.totals.inc) *  100);
            }else {
                data.percentage = -1; //Nan
            }
        },
        
        getBudget: function(){
          return {
              budget: data.budget,
              totalInc: data.totals.inc,
              totalExp: data.totals.exp,
              percentage: data.percentage
          };  
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
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'
    };
    
    return {
        getInput: function() { // will be either inc or exp the value
            return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        
        addListItem: function(obj,type){
        var html, newHtml,element;    
        //Create HTML string with placeholder text
            
        if(type === 'inc') { //if it is income
            element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div   class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        } else if(type === 'exp'){ //if it is expense
            element = DOMstrings.expensesContainer;            
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }
        //Replace the placeholder text with  the from our object
        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.description);
        newHtml = newHtml.replace('%value%', obj.value);
        //Insert the HTML into DOM
            
        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml); // it will be append it as a child of income__list and expe.
        },    
        
        deleteListItem: function(selectorID){
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);// we can only remove a child 
        },
        
        clearFields: function() {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue) //querySelectorAll returns list, we want array , we have to convert it
            
            fieldsArr = Array.prototype.slice.call(fields); // slice() is a method of array proto propert, we have to do a trick to use it on the list, we use call() and set this variable to fields,NodeList objects have the length property, and we can iterate through them. That's why it's possible to call the slice() method on them.However, NodeLists don't inherit from the Array.prototype
            
            fieldsArr.forEach(function(current, index, array){//clear our fiel 
                current.value =""; //forEach() calls a provided callback function once for each element in an array                          
            });
            fieldsArr[0].focus(); //select first element
        },
        
        displayBudget: function(obj){
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
            
            
            if(obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';  
            } else{
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },
        
        getDOMstrings: function() {
            return DOMstrings;
        }
    };
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
 
     //Select the parent element for all our items we want to delete   
    document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem); 
        
    }; // setUpEventListeners()
    
    var updateBudget = function(){
        //1.Calculate the budget 
        budgetCtrl.calculateBudget();// just save it result to our data struc
        // 2. return the budget
        var budget = budgetCtrl.getBudget(); //get the data from our data stru
        
        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };
    
    
    var ctrlAddItem = function(){         
        var input, newItem;
        //1. Get the field input data
        input = UICtrl.getInput();
        
        // only happens if there is some input
        if(input.description !== ""  && !isNaN(input.value) && input.value > 0){

        //2. Add the item to the budget  controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        // 3. Add the item to the UI
        UICtrl.addListItem(newItem, input.type);
        // 4. Clear fields
        UICtrl.clearFields();

        //5 Claculate and update budget
        updateBudget();
              budgetCtrl.testing();
       } // /if conditon
        
    }; // /ctrlAdditem ()
    
    //the callbeck func of addEventListenr has alwasys acces to event obj, in Event deleg an event  bubbles up and then we can know where it was first fired, by looking at the target property of the event
   var ctrlDeleteItem = function (event){
      var itemID, splitID,type,ID;
       //DOM traversing move up, we retrieve our unique id of our item
       itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
       
       if(itemID){
           splitID = itemID.split('-');
           type= splitID[0];
           ID = parseInt(splitID[1]);
           
           //1. Delet the item from the data structure
           budgetCtrl.deleteItem(type, ID);
           //2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);
           //3. Update and show the new budget
           updateBudget();//we reuse the func
       }
   };    

    return {
      init: function() {
       setUpEventListeners();
        // after each reload , reset everything to 0
//          UICtrl.displayBudget({
//              budget: 0,
//              totalInc: 0,
//              totalExp: 0,
//              percentage: -1
//          });
          //or 
          UICtrl.displayBudget(budgetCtrl.getBudget());
      }
    
    };

    
}) (budgetController, UIController);


controller.init();
