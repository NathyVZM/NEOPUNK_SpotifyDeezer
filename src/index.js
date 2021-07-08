// index.js

require('dotenv').config();

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

const handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

// INITILIAZATIONS
const app = express();
require('./db');
require('./config/passport');

// SETTINGS
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    defaultLayout: "inicial",
    layoutsDir: path.join(app.get('views'), "layouts"),
    partialsDir: path.join(app.get('views'), "partials"),
    extname: ".hbs"
}));

app.set('view engine', '.hbs');

// MIDDLEWARES
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(methodOverride('_method'));
app.use(session({
    secret: "mysecretapp",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// GLOBAL VARIABLES
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})

// ROUTES
app.use(require('./routes/paginaPrincipal'));
app.use(require('./routes/artista'));
app.use(require('./routes/playlist'));
app.use(require('./routes/buscar'));
app.use(require('./routes/cancionesFav'))

// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

// SERVER IS LISTENING
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})