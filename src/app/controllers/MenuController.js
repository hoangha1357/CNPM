class MenuController{

    index(req,res){
        res.render('menu');
    }

}

module.exports = new MenuController