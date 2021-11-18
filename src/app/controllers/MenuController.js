const Dish                      = require('../models/Dish');
const Cart                      = require('../models/Cart');
const { mutiMongoosetoObject,MongoosetoObject,modifyRequestImage }  = require('../../util/subfuntion');


class MenuController {
    //get menu
    index(req, res, next) {
        var category = 'Combo';
        var cart = new Cart(req.session.cart);
        if(req.query.category) category = req.query.category;
        if(!req.query.page) req.query.page = 1;
        Promise.all([Dish.find({type_dish: category}).limit(6).skip((req.query.page - 1) * 6), Dish.countDocuments({type_dish: category})])
            .then(([dishes, count]) => {
                res.render('Menusub/menu', { 
                    cartdishes: cart.generateArray(),
                    totalPrice: cart.totalPrice,
                    totalQty: cart.totalQty,
                    dishes: mutiMongoosetoObject(dishes),
                    page: req.query.page,
                    user: req.user,
                    count,
                    category,
                });
            })
            .catch(next);
    }
    
    // [POST] /menu/store
    store(req, res, next) {
        modifyRequestImage(req);
        const dish = new Dish(req.body);

        dish.save()
            .then(() => res.redirect('/manager/viewrevenue'))
            .catch((error) => {
                res.json(error);
            });
    }

    // [PUT] /menu/:id
    update(req, res, next) {
        
        if(req.body.image){
            modifyRequestImage(req);
            Dish.updateOne({ _id: req.params.id }, req.body)
                .then(() => res.redirect('/manager/viewrevenue'))
                .catch(next);
        }
        else{
            Dish.updateOne({ _id: req.params.id }, {$set: {name: req.body.name, type_dish: req.body.type_dish ,price: req.body.price }})
                .then(() => res.redirect('/manager/viewrevenue'))
                .catch(next);
        }
    }

    // [DELETE] /menu/:id
    delete(req, res, next) {
        Dish.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /menu/:id/force
    permanentdelete(req, res, next) {
        Dish.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /menu/:id/restore
    restore(req, res, next) {
        Dish.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[POST] /menu/handle-form-action
    handleFormAction(req, res, next){
        switch(req.body.action){
            case 'delete':
                Dish.delete({ _id: { $in : req.body.dishIds} })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'add-recommed':
                Dish.updateMany({ _id: { $in : req.body.dishIds} }, {recommend: true})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'remove-recommed':
                Dish.updateMany({ _id: { $in : req.body.dishIds} }, {recommend: false})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'permanent-delete':
                Dish.deleteMany({ _id: { $in : req.body.dishIds} })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Dish.restore({ _id: { $in : req.body.dishIds} })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.send('Invalid Action');
        }
    }
}



module.exports = new MenuController();

