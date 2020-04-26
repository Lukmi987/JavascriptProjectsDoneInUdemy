import axios from 'axios';
async function getResults(query){
    try{ 
        //it does ajax call and returns a promise
         const res = await  axios(`https://forkify-api.herokuapp.com/api/search?q=${query}`); //automatically returns json
        const recipes = res.data.recipes;
        console.log(recipes);
    } catch(error){
        alert(error);
    }
}

//http://forkify-api.herokuapp.com

getResults('pizza');