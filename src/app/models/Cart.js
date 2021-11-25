
module.exports = function Cart(oldCart) {
    this.items = oldCart ? oldCart.items : {};
    this.totalQty = oldCart ? oldCart.totalQty : 0;
    this.totalPrice = oldCart ? oldCart.totalPrice : 0;

    this.add = function(item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;

    };

    this.remove = function(id) {
        // const removeIndex = this.items.findIndex(item => item.dishid === itemId);
        // // var filtered = someArray.filter(function(el) { return el.Name != "Kristian"; }); 
        // this.items.splice(removeIndex, 1);

        // delete this.items.itemId;

        var deletedItem = this.items[id]; 
       
        this.totalQty -= deletedItem.qty  ; // Giảm tổng số lượng 
        this.totalPrice -= deletedItem.price; // Giảm tổng giá

        // Tạo object mới chứa các phần tử có id != 'id'
        const ObjdeleteItem = Object.keys(this.items).reduce((acc, key) => {
            if (key !== id ) {
                acc[key] = this.items[key]
            }
            return acc
        }, {}) 

        this.items =  ObjdeleteItem;
        
    }

    this.generateArray = function() {
          var arr = [];
          for(var id in this.items) {
              arr.push(this.items[id]);
          }
          return arr;
    };

    this.update = function(qty, id) {
        var updateItem = this.items[id];
        this.totalQty = this.totalQty - updateItem.qty + qty;
        this.totalPrice = this.totalPrice - updateItem.item.price * ( updateItem.qty - qty) ;
        updateItem.qty = qty;
        updateItem.price = updateItem.item.price * qty;
    };


};


