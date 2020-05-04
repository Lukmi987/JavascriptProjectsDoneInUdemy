//al of our DOM elements goes right here into elements object
export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shoppingList: document.querySelector('.shopping__list'),
    recipeLikes: document.querySelector('.recipe__love'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')
};

//like this better for maintainbility than being hard coded
export const elementString ={
    loader: 'loader'
}

export const renderLoader = parent => {
    const loader = `
        <div class="${elementString.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>   
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

export const removeArrow = () => {
    //to remove element first we need to select its parent
    const loader = document.querySelector( `.${elementString.loader}`);
if(loader) loader.parentElement.removeChild(loader);
};