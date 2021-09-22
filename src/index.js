const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;
const db = require('./config/db');
const route = require('./routes/index');
const methodOverride = require('method-override');

db.connect();

app.use(methodOverride('_method')); //override using a query value

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
        helpers: {
            //create suport funtion
            sum: (a, b) => a + b,
            mul: (a, b) => a * b,
        },
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views')); // set views

route(app);

app.listen(port, () => {
    console.log(`Restaurant app listening at http://localhost:${port}`);
});
