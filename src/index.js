const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;
const db = require('./config/db');
const route = require('./routes/index');

db.connect();

//app.use(morgan("combined")) // track HTTP call

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public'))); // set static public

//templet engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs', // change file types name
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views')); // set views

route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
