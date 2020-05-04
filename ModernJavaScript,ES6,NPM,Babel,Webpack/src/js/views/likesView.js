import {elements} from './base';
import {limitRecipeTitle} from './searchView';
{/* <button class="recipe__love">
<svg class="header__likes">
    <use href="img/icons.svg#icon-heart-outlined"></use>
</svg> */}


export const toggleLikeBtn = isLiked => { 
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
}


//if we should show the like menu
export const toggleLikeMenu = numLikes => {
    //if we have many styles to apply we could define a  class in css and toggle that class using Javascript
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
}

export const renderLike = like => {
    const markup = `
            <li>
                <a class="likes__link" href="#${like.id}">
                    <figure class="likes__fig">
                        <img src="${like.img}" alt="${like.title}">
                    </figure>
                    <div class="likes__data">
                        <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                        <p class="likes__author">${like.author}</p>
                    </div>
                </a>
            </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend',markup);
}

export const deleteLike = id => {
        //selct on based on href attribute, select the links with the likes link class
    const el = document.querySelector(`.likes__link[href="#${id}"]`).parentElement;
    /**
     * so we selected a tags with class likes__link and we want to delete all between <li></li> so we select parent elementr
     */
console.log(el.parentElement);
     if(el) el.parentElement.removeChild(el);
}