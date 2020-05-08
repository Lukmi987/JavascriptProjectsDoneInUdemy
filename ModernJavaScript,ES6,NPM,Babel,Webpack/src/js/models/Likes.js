import uniqid from 'uniqid';

export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id,title,author,img){
        const like = {
            id,
            title, 
            author, 
            img
        };
        this.likes.push(like);
        
        //Persist data in localStorage
        this.persistData();
        return like;
    }

    deleteLike(id){
        console.log(id);
        const index = this.likes.findIndex(el => el.id === id);
        console.log(index);
        this.likes.splice(index, 1);
        
        //Persist data in localStorage
        
        this.persistData(); //this. coz it is a method on this exact object
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;// if index find it is in liked list
    }

    getNumLikes() {
        return this.likes.length;
    }

    //when we change the like array that exact moment we should save it into the localStorage

    persistData(){
        //we can only save strings so we have to convert the array to strings
        localStorage.setItem('like', JSON.stringify(this.likes));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('like'));//this will be a string we need to convert it back
 
        // Restoring likes from the localStorage
        if (storage) this.likes = storage; //if not null
    }
}