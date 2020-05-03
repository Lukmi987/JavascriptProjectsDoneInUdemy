import uniqid from 'uniqid';
export default class List {
    constructor(){
        this.items = []; // all our elements will be stored in this property
    }

    addItem(count, unit, ingredient){
        //we will have an array in which each of the elements is an object
        //we need an unique id for each item
        const item = {
            id: uniqid(), //  count: count; //in ES6 not neccessary
            count,
            unit,
            ingredient
        }
         this.items.push(item);
        return item;
    }

    deleteItem(id){
        const index = this.items.findIndex(el => el.id === id);// return index which matches the condition
        //[2,4,8] splice(1,1) -> return 4, and mutate the original array [2,8] // second argument how many elements
        //[2,4,8] slice(1,2) -> return 4, and the original array [2,4,8] //second is end but not included
        this.items.splice(index,1); //mutates the original array

    }

    updateCount(id,newCount){
       //loop throgh all the elements in items and select the one which satisfy the conditio
        this.items.find(el => el.id === id).count = newCount; //will return the element itself
    }
}