import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

   async getRecipe(){
       try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher_url;
            this.img = res.data.recipe.imgage;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
         } catch (error){
           console.log(eror);
           alert('something went wrong !!!');
       }
   }

   calcTime() {
       // Providing that we need 15 min for each 3 ingreadients
       const numIng = this.ingredients.length;
       const periods = Math.ceil(numIng/3);
       this.time = periods * 15;
   }

   calcServings() {
       this.servings = 4;
   }

   parseIngrediens() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces','ounce', 'teaspoons','teaspoon','cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp','oz','oz', 'tsp','tsp','cup', 'pound'];
       

        /**
         * First round we take ingredient from index 0 ('One teaspoon of sugar') and apply modification on this string after our inner loops ends we move to other string
         * In each iteration of map we return our modified string and save it to newIngredients array
         */
        const newIngredients = this.ingredients.map(el => {
            //console.log(`${el} hola`);
                //Uniform units
                let ingredient = el.toLowerCase();
                    //loop over the long unit and replace it by short unit if we find a match in our current ingredient string  
                    unitsLong.forEach((unit, i) =>{
                        ingredient = ingredient.replace(unit,unitsShort[i]);
                    });

                // 2) Remove parentheses
                ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

                 // 3) Parse ingredients into count, unit and ingredient

            return ingredient;
            });

        this.ingredients = newIngredients;
    }
}