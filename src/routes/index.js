const menuRouter = require('./menu');
const siteRouter = require('./site');
const userRouter = require('./user');
const adminRouter = require('./admin');
const managerRouter = require('./manager');
const bookTableRouter = require('./booktable');

function route(app) {
    app.use('/menu', menuRouter);
    app.use('/user', userRouter);
    app.use('/manager', managerRouter);
    app.use('/booktable', bookTableRouter);
    app.use('/admin', adminRouter);
    app.use('/', siteRouter);
}

module.exports = route;
