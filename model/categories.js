const categories =
{

    data:[],

    init(){

        this.data.push({title:'Photography', picture:"/img/camera.jpeg"});
    
         this. data.push({title:'Clothes',picture:"/img/clothes.jpg"});
    
        this.data.push({title:' Video Games', picture:"/img/video_game.jpeg"});

        this.data.push({title:'Audio', picture:"/img/audio.jpg"});

    },

    getData(){

        return this.data;

    }


}

categories.init();
module.exports=categories;