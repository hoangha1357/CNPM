const Dish = require('../models/Dish');
const { mutiMongoosetoObject } = require('../../util/mongoose');
const { MongoosetoObject } = require('../../util/mongoose');
const imageMimeTypes = ['image/jpg', 'image/png','image/gif'];

class MenuController {
    //get menu
    index(req, res, next) {
        Dish.find({})
            .then((dishes) => {
                res.render('menu', { dishes: mutiMongoosetoObject(dishes) });
            })
            .catch(next);
    }
    // [Get] /menu/create
    create(req, res, next) {
        res.render('Menusub/create');
    }
    
    // [POST] /menu/store
    store(req, res, next) {
        modifyRequestImage(req);
        const dish = new Dish(req.body);

        dish.save()
            .then(() => res.redirect('/user/viewrevenue'))
            .catch((error) => {
                res.json(error);
            });
    }

    // [Get] /menu/:id/edit
    edit(req, res, next) {
        Dish.findById(req.params.id)
            .then((dish) =>
                res.render('Menusub/edit', {
                    dish: MongoosetoObject(dish),
                }),
            )
            .catch(next);
    }

    // [PUT] /menu/:id
    update(req, res, next) {
        
        if(req.body.image){
            modifyRequestImage(req);
            Dish.updateOne({ _id: req.params.id }, req.body)
                .then(() => res.redirect('/User/viewrevenue'))
                .catch(next);
        }
        else{
            Dish.updateOne({ _id: req.params.id }, {$set: {name: req.body.name, price: req.body.price, dish_type: req.body.dish_type}})
                .then(() => res.redirect('/User/viewrevenue'))
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
            default:
                res.send('Invalid Action');
        }
    }
}

function modifyRequestImage(req){
    if(req.body.image) {
        const image = JSON.parse(req.body.image);
        if(image && imageMimeTypes.includes(image.type)){
            req.body.image = new Buffer.from(image.data,'base64');
            req.body.imageType = image.type;
        }
    }
}

module.exports = new MenuController();

