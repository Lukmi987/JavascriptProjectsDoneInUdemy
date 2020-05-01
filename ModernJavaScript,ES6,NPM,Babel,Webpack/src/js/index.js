import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, renderLoader,removeArrow, elementString} from './views/base';
import Recipe from './models/Recipe';
import * as recipeView from './views/recipeView';





////////////////////////////// SEARCH CONTROLLER //////////////////////////////////
/** Global state of the app
 * -Search object
 * Current recipe object
 * -Liked recipes
 * All of these data will be stored at all time in one central variable which we can then access through our controller
 */ 
//my central variable
const state = {};

const controlSearch = async () => {
    // 1) Get query from view  
    const query = searchView.getInput();
   // const query = 'pizza';

    if(query){
        // 2) New Search object and add to state
        state.search = new Search(query); //new instance where our object currently lives
        console.log(state.search);
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
                recipeView.renderRecipe(state.recipe);
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
