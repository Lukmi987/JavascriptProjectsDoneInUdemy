import {elements} from './base';
// I have to get the input by function, coz by variable it would immediately be set when i load the page(to empty string)
export const getInput = () =>  elements.searchInput.value;

export const clearInput = () => elements.searchInput.value = '';
export const clearResults = () => elements.searchResList.innerHTML = '';


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
        title.split('').reduce(callbackForReduce, 0); //second parameter is the initial value
        
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

// we receives array with recepis now wee need to loop trough them 
export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
}