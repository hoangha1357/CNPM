const menuRouter = require('./menu');
const siteRouter = require('./site');
const userRouter = require('./user');
const managerRouter = require('./manager');

function route(app) {
    app.use('/menu', menuRouter);
    app.use('/user', userRouter);
    app.use('/manager', managerRouter);
    app.use('/', siteRouter);
}

module.exports = route;
