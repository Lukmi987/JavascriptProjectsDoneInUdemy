import axios from 'axios';

//export default is used to export a single class, function or primitive
export default class Search {
    constructor(query){
        // this query parame is the one that we need to specify whenever we create a new object based on this search class
        this.query = query;
    }

    async getResults(){
        try{ 
            //it does ajax call and returns a promise
             const res = await  axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`); //automatically returns json
        //This is how our data model works, instead or returning our result right away, it stores it to this.result and the data are encapsulated inside of the Search object
            /**
             * The result property is declared and initialized directly in the getResults() method
             * same as adding a new property to the object: obj.newProp = 'Hello'; */ 
            this.result = res.data.recipes;
           // console.log(this.result);
        } catch(error){
            alert(error);
        }
    }
}git

