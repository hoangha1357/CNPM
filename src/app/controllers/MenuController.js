const Dish = require('../models/Dish');

class MenuController {
    //get menu
    index(req, res) {

        Dish.find({}, function (err, dishes,next) {
            if (!err) res.json(dishes);
            else next(err);
        });
        //res.render('menu');
    }

    show(req, res) {
        res.send('món ăn');
    }
}

module.exports = new MenuController();
