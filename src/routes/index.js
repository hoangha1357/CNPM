const menuRouter = require('./menu');
const siteRouter = require('./site');
const userRouter = require('./user');
const managerRouter = require('./manager');
const tableReservationRouter = require('./tableReservation');

function route(app) {
    app.use('/menu', menuRouter);
    app.use('/user', userRouter);
    app.use('/manager', managerRouter);
    app.use('/tablereservation', tableReservationRouter);
    app.use('/', siteRouter);
}

module.exports = route;
