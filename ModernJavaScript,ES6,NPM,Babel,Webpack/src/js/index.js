import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements} from './views/base';
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
        searchView.clearResults();
        //4) Search for recipes
            //we wait until getResults return and only then it continous to step 5
        await state.search.getResults(); //returns a promise evry async func

        //5) Render results on UI
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


