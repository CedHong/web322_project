const categories =
{

    data:[],

    init(){

        this.data.push({title:'General',  category: "general", picture:"/img/general.jpg"});
    
         this. data.push({title:'Electronics' , category: "electronics", picture:"/img/electronics.jpeg"});
    
        this.data.push({title:' Clothing',category: "clothing", picture:"/img/clothing.jpg"});

        this.data.push({title:'Books',category: "books", picture:"/img/books.jpg"});

    },

    getData(){

        return this.data;

    }


}

categories.init();
module.exports=categories;