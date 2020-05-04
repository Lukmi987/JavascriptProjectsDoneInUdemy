import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, renderLoader,removeArrow, elementString} from './views/base';
import Recipe from './models/Recipe';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import List from './models/List';
import Likes from './models/Likes';



////////////////////////////// SEARCH CONTROLLER //////////////////////////////////
/** Global state of the app
 * -Search object
 * Current recipe object
 * -Liked recipes
 * All of these data will be stored at all time in one central variable which we can then access through our controller
 */ 
//my central variable
const state = {};
window.state = state;

const controlSearch = async () => {
    // 1) Get query from view  
    const query = searchView.getInput();
   // const query = 'pizza';

    if(query){
        // 2) New Search object and add to state
        state.search = new Search(query); //new instance where our object currently lives
        //console.log(state.search);

        //3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults(); //clear old results
        renderLoader(elements.searchRes); //put the spinning arrow while we are wainting

        try{ 
            //4) Search for recipes
                //we wait until getResults return and only then it continous to step 5
            await state.search.getResults(); //returns a promise evry async func

            //5) Render results on UI
            removeArrow(); 
            searchView.renderResults(state.search.result);
        } catch(error){
            alert(`Something went wrong`);
            removeArrow(); 
        }
    }
}


elements.searchForm.addEventListener('submit', e =>{
   /** 
    * whenever we submit a form we prevent reload the page
    * and call our callback func
   */
    e.preventDefault();
    controlSearch();
});


//for TESTING
// window.addEventListener('load', e =>{
//     /** 
//      * whenever we submit a form we prevent reload the page
//      * and call our callback func
//     */
//      e.preventDefault();
//      controlSearch();
//  });



 
/**
 * Event Delegation
 * Event delegation allows us to attach a single event listener, to a parent element, that will fire for all descendants matching a selector, whether those descendants exist now or are added in the future
 * We attach the event listeners to an element that is already there, and then we try to figure out where  the click happened
*/
elements.searchResPages.addEventListener('click', e=>{//button functionality
    const btn = e.target.closest('.btn-inline'); //we are only intersted in the ones with the class of button inline
    if (btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result,goToPage)
    }
});




/**
 * RECIPE CONTROLLER //////////////////////////////////////////
 */

 const controlRecipe = async () => {
     //window.location whole search bar, hash is a string and we can call all string methods on it
    //we need our # symbol in url to use hash
     const id = window.location.hash.replace('#','');

    if(id){
        //Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);//spinnig arrow

        //Highlight selected search item
         if (state.search) searchView.highlightSelected(id);

        //Create a new recipe object based on the Recipe model and save it in our state, same like we did wit the search
        state.recipe = new Recipe(id);
        window.r = state.recipe;//testing
        try{ 
                //Get Recipe data it return prome so we wait (await) before we continue
                await state.recipe.getRecipe();// getRecipe() method, we need to await for the results returned from the API. Only then we can assign the data returned from the API to appropriate properties.In the controlRecipe() function, we can't go further without the values assigned in the getRecipe() function. That's why we also need to await here.
               
                state.recipe.parseIngrediens();

                //Calcutale servings and time
                state.recipe.calcTime();
                state.recipe.calcServings();

                //Render the recipe
                removeArrow();
                recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
                // no state holds 2 objects: {search: Search, recipe: Recipe}
            // console.log(state);
        } catch(error){
            alert(error);
        }
    }
 };

 //window.addEventListener('hashchange', controlRecipe);
 //windows.addEventListener('load',controlRecipe);, The load event is fired when the whole page has loaded
['hashchange','load'].forEach(event => window.addEventListener(event, controlRecipe));



/**
 * LIST Controller
 */

const controlList = () => {
    //Create a new list If there is a none yet
    if (!state.list) state.list = new List(); // want to initialize an empty object
    
    //Add each ingredient to the list
    state.recipe.ingredients.forEach(el => {
      const item = state.list.addItem(el.count,el.unit,el.ingredient);
        // Render the list to shopping list
      listView.renderItem(item);
    });
    
}

//Handle delete and update list item events
elements.shoppingList.addEventListener('click', e => {
   const id = e.target.closest('.shopping__item').dataset.itemid;
    console.log(`Any id ${id}`);
   if(e.target.closest('.shopping__delete')){
    //Delete from state
    state.list.deleteItem(id);
    //Delete from UI
    listView.deleteItem(id);

    // Handle the count update
    } else if(e.target.closest('.shopping__count-value')){  
        const val = parseFloat(e.target.value,10);
        console.log(val);
       if(val > 0) state.list.updateCount(id,val);
    }   
});




/**
 * LIKE Controller
 */
state.likes = new Likes(); //se we add a new like when we load the page, in orde to be initialized

const controlLike = () => {
     //Create a new list If there is a none yet
    if(!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

     //User has not yet liked current recipe
    if(!state.likes.isLiked(currentID)) {
        //Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        //Toggle the like button
            likesView.toggleLikeBtn(true);

        //Add like to UI list
       likesView.renderLike(newLike);
       
    } else { // User has liked current recipe
     
        //Remove like from the state
        state.likes.deleteLike(currentID);
        //Toggle the like button
        likesView.toggleLikeBtn(false);

        //Remove like from UI list
        likesView.deleteLike(currentID);
     };
     //if 0 likes the heart symbol hide
 likesView.toggleLikeMenu(state.likes.getNumLikes());
};



// Handling recipe button clicks, using Event Delegation coz the buttons are not yet there by the time we load the page
elements.recipe.addEventListener('click', e=> {
   
    //True if target matches the button decrease or any child element of the button
    //we tes what was clicked and react
    if (e.target.closest('.btn-decrease')){// The matches() method only checks the class of the actual element itself.
        console.log(state.recipe.ingredients);
        if(state.recipe.servings > 1){ 
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);//update user Interface people count
        }
    } else if(e.target.matches('btn-increase, .btn-increase *')){ 
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }else if(e.target.closest('.recipe__btn--add')){
       //Add the ingredients to shopping List
        controlList();      
    } else if (e.target.matches('.recipe__love, .recipe__love *')){
        //Like controlller
        controlLike();
    }
});

window.list = new List();
