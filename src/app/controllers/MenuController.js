const Dish = require('../models/Dish');
const { mutiMongoosetoObject } = require('../../util/mongoose');

class MenuController {
    //get menu
    index(req, res, next) {
        Dish.find({})
            .then((dishes) => {
                res.render('menu', { dishes: mutiMongoosetoObject(dishes) });
            })
            .catch(next);
    }

    create(req, res, next) {
        res.render('Menusub/create');
    }

    store(req, res, next) {
        const formdata = req.body;
        
        const dish = new Dish(formdata);
        dish.save()
            .then(() => res.redirect('/menu'))
            .catch(error =>{
                //them sau
            });
    }
}

module.exports = new MenuController();
