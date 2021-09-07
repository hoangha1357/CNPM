class SiteController {
    home(req, res) {
        res.render('home');
    }

    search(req, res) {
        res.render('search');
    }

    register(req, res) {
        res.render('register');
    }

    booktable(req, res) {
        res.render('book_table');
    }
}

module.exports = new SiteController();
