import {elements} from './base';
// I have to get the input by function, coz by variable it would immediately be set when i load the page(to empty string)
export const getInput = () =>  elements.searchInput.value;

export const clearInput = () => elements.searchInput.value = '';

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
        const   results_link = Array.from(document.querySelectorAll('.results__link'));
        results_link.forEach(el => {
            el.classList.remove('results__link--active');
        });
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active'); // just class name but not the selector
};


const limitRecipeTitle = (title,limit = 17) => {
   // a const newTitle we can not really mutate, adding things to an array is not mutating the underlying variable itself, same for objects
    const newTitle = [];
    const callbackForReduce = (acc,cur) => { //first parame of reduce is callback with 2 paramaters, accumulator for each iteration of an array, second the current value
        if (acc + cur.length <= limit) {
           newTitle.push(cur); //push the curr value to new array if accumu not bigger than 17
        }
       /**
        * To update an accumulator works in reduce func by returning a value,
        * So the value that we retunr in each iteration of this loop in callback func in reduced method will be the new accumulator
        */
        return acc + cur.length;
    };

    if(title.length > limit) {  
        
        /** str = "How are you doing today?";
         * str.split(" "); ["How", "are", "you", "doing", "today?"]
         */
        title.split(' ').reduce(callbackForReduce, 0); //second parameter is the initial value
        
        //return the result, join opposite of split()
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}


//helper func ,just to print one recepi
const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    elements.searchResList.insertAdjacentHTML('beforeend',markup);
}


// type: 'prev' or 'next'
const createButton = (page,type) => `
        <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page -1 : page + 1}>
        <span>Page ${type === 'prev' ? page -1 : page + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type=== 'prev' ? 'left' : 'right'}"></use>
            </svg>
            
        </button>
`;

//a private func coz we will call it from renderResults 
const renderButtons = (page, numResults, resPerPage) => {
//we need to know on which page we are and how many there are total
    const pages = Math.ceil(numResults / resPerPage);

    let button; //we want to reassign it
    if(page === 1 && pages > 1) { // if we are on the first and && we must have more than one page to show the button
        //Only one button to go to the next page
        console.log(page);
        button = createButton(page,'next');
    }else if (page < pages){ // if we are on the middle page
        //Both buttons
         button = ` ${createButton(page,'prev')}
                    ${createButton(page,'next')}`;
    } else if  (page === pages && pages > 1) {  //if we are on the last page and we results for more than one page
        //Only one button to the the previous page
        button = createButton(page,'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin',button);
};

// we receive array with recipes now we need to loop trough them 
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
   // render results of current page
    const start = (page - 1) * resPerPage; //first round (1-1) * 10, so we starat on 0 index
    const end = page * resPerPage;
    //slice second parameter end is until that index but noc included and we want to start on 0 index
    recipes.slice(start,end).forEach(renderRecipe);

    //render pagination button
    renderButtons(page,recipes.length, resPerPage);
}