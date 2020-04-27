import {elements} from './base';
// I have to get the input by function, coz by variable it would immediately be set when i load the page(to empty string)
export const getInput = () =>  elements.searchInput.value;

export const clearInput = () => elements.searchInput.value = '';
export const clearResults = () => elements.searchResList.innerHTML = '';


//helper func ,just to print one recepi
const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
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