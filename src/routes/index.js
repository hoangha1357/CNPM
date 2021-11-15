const menuRouter = require('./menu');
const siteRouter = require('./site');
const userRouter = require('./user');
<<<<<<< Updated upstream
const managerRouter = require('./manager');
=======
const tableReservationRouter = require('./tableReservation');
>>>>>>> Stashed changes

function route(app) {
    app.use('/menu', menuRouter);
    app.use('/user', userRouter);
<<<<<<< Updated upstream
    app.use('/manager', managerRouter);
=======
    app.use('/tablereservation', tableReservationRouter);
>>>>>>> Stashed changes
    app.use('/', siteRouter);
}

module.exports = route;
