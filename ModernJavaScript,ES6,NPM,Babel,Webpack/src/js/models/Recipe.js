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
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
            console.log(this.ingredients);
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
             
                //Uniform units
                let ingredient = el.toLowerCase();
                    //loop over the long unit and replace it by short unit if we find a match in our current ingredient string  
                    unitsLong.forEach((unit, i) =>{
                        ingredient = ingredient.replace(unit,unitsShort[i]);
                    });

                // 2) Remove parentheses
                ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

                 // 3) Parse ingredients into count, unit and ingredient
                 const arrIng = ingredient.split(' ');
                 //includes return true if current element is contained in unitShort array, for each element in arrIng array we perform test and then it returns index of our tested element
                 const unitIndex = arrIng.findIndex( el2 => unitsShort.includes(el2));
                 //console.log(`my unit index ${unitIndex}`);

                 let objIng;
                    if(unitIndex > -1){ //if  bigger we found the index
                        //there is a unit
                        //Ex. for 4 1/2 cups
                        //Ex 4 cups
                        
                        const arrCount = arrIng.slice(0,unitIndex);
                        
                        let count;
                        if(arrCount.length === 1){
                           //for case 4-1/2 with dash we use replace
                            count = eval(arrIng[0].replace('-', '+'));
                        } else {
                            // in case like: 4 1/2
                            count = eval(arrIng.slice(0,unitIndex).join('+'));// so it will be string '4+1/2'
                        }

                        //we recreate our object
                        objIng = {
                            count,
                            unit: arrIng[unitIndex],
                            ingredient: arrIng.slice(unitIndex +1).join(' ')
                        }

                    
                        } else if (parseInt(arrIng[0],10)) { //we assume that number always appear on same position
                        // no unit but element is number, if conversi success we return number else NaN
                            objIng = {
                                count: parseInt(arrIng[0],10),
                                unit: '',
                                ingredient: arrIng.slice(1).join(' ') //slice start from first argu till the end, and then pu them all together
                            }

                        } else if(unitIndex === -1){    //there is no unit and NO number in 1st position
                            objIng = {  
                                count: 1,
                                unit: '',
                                ingredient// in ES6 automatically assign value to it same like ingredient: ingredient
                            }
                        }
                
                
                return objIng; //save it to newIngredients
            });

        this.ingredients = newIngredients;
    }
}