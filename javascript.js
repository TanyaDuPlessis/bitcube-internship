

const app = {
    data() {
        return {
            stock: [],
            buyersList: [],
            page: "home/page",
        }
    },

    methods: {
        changePage(page) {
            this.page = page;
        },

        addStock() {
            //get input elements
            let productSelectEl = document.getElementById("productSelect");
            let itemsReceivedEL = document.getElementById("itemsReceived");
            let itemsPriceEL = document.getElementById("itemsPriceAdded");
            //get input values
            let productSelectVal = productSelectEl.value;
            let itemsReceivedVal = parseInt(itemsReceivedEL.value);
            let itemsPriceVal = parseInt(itemsPriceEL.value);
            //create stock items
            for (let i = 0; i < itemsReceivedVal; i++) {
                let stockItem = {
                    productCode: productSelectVal,
                    price: itemsPriceVal
                }
                //append stock items to stock list
                this.stock.push(stockItem);
            }
            console.log(this.stock);
            toastr.success("Stock Successfully Added");
            productSelectEl.value = "";
            itemsReceivedEL.value = "";
            itemsPriceEL.value = "";
        },


        removeStock() {
            //get input elements
            let productSelectEl = document.getElementById("productSelect");
            let buyerEmailEL = document.getElementById("buyerEmail");
            let itemsBoughtEL = document.getElementById("itemsBought");
            //get input values
            let productSelectVal = productSelectEl.value;
            let buyerEmailVal = buyerEmailEL.value;
            let itemsBoughtVal = parseInt(itemsBoughtEL.value);

            //alert if email address already used
            if (this.buyersList.includes(buyerEmailVal)) {
                document.getElementById("errorMessage").innerHTML = "Email Address Already Used";
                return
            }

            let filteredList = this.stock.filter(x => x.productCode === productSelectVal);
            if (filteredList.length < itemsBoughtVal) {
                toastr.error("Insufficient Stock");
                return
            }
            this.buyersList.push(buyerEmailVal);

            //remove stock items
            for (let i = 0; i < itemsBoughtVal; i++) {
                //append stock items to stock list
                //true or false
                let index = this.stock.findIndex(el => el.productCode === productSelectVal);
                //want product from index to index
                let removedStockItem = this.stock.splice(index, 1);
                console.log(removedStockItem);
            }
            console.log(this.stock);
            toastr.success("Stock Successfully Removed");
            productSelectEl.value = "";
            buyerEmailEL.value = "";
            itemsBoughtEL.value = "";
        },

        //display current stock levels and price
        viewStockLevels(productCode) {
            return this.stock.filter(x => x.productCode === productCode).length;
        },

        viewAverageStockPrice(productCode) {
            let filteredList = this.stock.filter(x => x.productCode === productCode);
            let totalPrice = filteredList.reduce((prev, curr) => prev + curr.price, 0);
            let averagePrice = totalPrice / filteredList.length;
            if (isNaN(averagePrice)) {
                return "0.00";
            }
            else {
                return averagePrice.toFixed(2);
            }
        }
    }
};

Vue.createApp(app).mount("#vue-app")