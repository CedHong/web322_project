class Cart {


    constructor() {

        this.items = {};
        this.price = 0.00;
        this.totalItems = 0;


    }

    copy(sourceCart) {

        this.items = sourceCart.items;
        this.price = sourceCart.price;
        this.totalItems = sourceCart.totalItems;

    }


    addItem(id, item, quantity, price) {

        if (quantity > 0) {

            if (!(this.items.hasOwnProperty(id))) {

                this.items[id] = { item: item, quantity: quantity, price: price };

                this.price += this.items[id].price * this.items[id].quantity;



            } else {


                this.items[id].quantity += quantity;

                this.price += this.items[id].price * quantity;

            }

            this.totalItems += quantity


        }



    }


    emptyCart() {

        this.items = {};
        this.price = 0.00;
        this.totalItems = 0;


    }


    removeItem(id) {

        this.price = this.price - parseFloat(this.items[id].price * this.items[id].quantity);

        this.totalItems = this.totalItems - this.items[id].quantity;

        delete this.items[id];

        if (this.price == 0) {

            this.items = {};

        }


    }

    getOrder() {


        let order = "";

        let current_price = (this.price).toFixed(2);

        if (this.quantity != 0) {

            order += "Your order : <br>"

            for (var id in this.items) {

                order += `${this.items[id].item.productName} : ${this.items[id].quantity} x ${this.items[id].price}<br>`

            }

            order += `Final Price : $ ${current_price} <br> Thank you for using Happy Shop!`

        }


        return order;


    }








}

module.exports = {

    Cart: Cart

};