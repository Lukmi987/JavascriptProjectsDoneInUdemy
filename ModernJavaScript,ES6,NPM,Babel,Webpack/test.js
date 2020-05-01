const unitsShort = ['tbsp', 'tbsp','oz','oz', 'tsp','tsp','cup', 'pound'];

const ingredient ='4 1/2 ingredient cup and pound'
                    
arrIng = ingredient.split(' ');
const unitIndex = arrIng.findIndex(element => unitsShort.includes(element));

console.log(eval(arrIng.slice(0,2).join('+')));