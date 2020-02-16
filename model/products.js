const products =
{

    data:[],

    init(){

        this.data.push({
            title:'Sony A7III',
            description:`Sony camera`,
            price:`$3000.00`,  
            picture:"/img/camera.jpeg",
            best_seller: true
        });
        
        this.data.push({
            title:'USB Type C Cable',
            description:`USB Cable for USB type C`,
            price:`$9.99`,  
            picture:"/img/cable.jpeg",
            best_seller: false
        });

        this.data.push({
            title:'Messenger Bag',
            description:`Stylist Messenger Bag for everyday`,
            price:`$269.99`,  
            picture:"/img/messenger_bag.jpeg",
            best_seller: false
        });

        this.data.push({
            title:'Wing Zero',
            description:`Gundam Model Kit, great for all ages`,
            price:`$35.99`,  
            picture:"/img/wing_zero.jpeg",
            best_seller: true
        });

        this.data.push({
            title:'Final Fantasy 7 Remake',
            description:`Remake of the Legendary game: Final Fantasy 7`,
            price:`$70.99`,  
            picture:"/img/video_game.jpeg",
            best_seller: true
        });

        this.data.push({
            title: 'SD Card',
            description:`64GB SD card`,
            price:`$31.99`,  
            picture:"/img/sd_card.jpeg",
            best_seller: true
        });

    },

    getData(){

        return this.data;

    },


}

products.init();
module.exports=products;