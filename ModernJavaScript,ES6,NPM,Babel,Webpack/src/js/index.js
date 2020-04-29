import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, renderLoader,removeArrow} from './views/base';
import Recipe from './models/Recipe';





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

    if(query){
        // 2) New Search object and add to state
        state.search = new Search(query); //new instance where our object currently lives
        console.log(state.search);
        //3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults(); //clear old results
        renderLoader(elements.searchRes); //put the spinning arrow while we are wainting

        //4) Search for recipes
            //we wait until getResults return and only then it continous to step 5
        await state.search.getResults(); //returns a promise evry async func

        //5) Render results on UI
        removeArrow();  
        searchView.renderResults(state.search.result);
          
       
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

 
/**
 * Event Delegation
 * Event delegation allows us to attach a single event listener, to a parent element, that will fire for all descendants matching a selector, whether those descendants exist now or are added in the future
 * We attach the event listeners to an element that is already there, and then we try to figure out where  the click happened
*/
elements.searchResPages.addEventListener('click', e=>{
    const btn = e.target.closest('.btn-inline'); //we are only intersted in the ones with the class of button inline
    if (btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result,goToPage)
    }
});




/**
 * RECiPe CONTROLLER
 */

 const r = new Recipe(47025);
r.getRecipe();
console.log(r);

