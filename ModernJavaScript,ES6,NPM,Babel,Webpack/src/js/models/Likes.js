export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id,title,auther,img){
        const like = {id, title, author, img};
        this.likes.push(like);
        return like;
    }

    deleteLike(id){
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.slice(index,1);
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;// if index find it is in liked list
    }

    getNumLikes() {
        return this.likes.length;
    }
}