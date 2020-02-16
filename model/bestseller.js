const bestsellers =
{

    data:[],

    init(){

        this.data.push({title:'Daisy', picture:"/img/daisy.jpg"});
    
        this. data.push({title:'Iris',picture:"/img/iris.jpg"});
    
        this.data.push({title:'Orchid', picture:"/img/orchid.jpg"});

        this.data.push({title:'Sunflowers', picture:"/img/sunflowers.jpg"});

    },

    getData(){

        return this.data;

    }


}

bestsellers.init();
module.exports=bestsellers;