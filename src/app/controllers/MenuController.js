class MenuController {
    //get menu
    index(req, res) {
        res.render('menu');
    }

    //get menu/:slug
    show(req, res) {
        res.send('món ăn');
    }
}

module.exports = new MenuController();
