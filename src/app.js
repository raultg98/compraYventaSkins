// IMPORTS
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const { database }= require('./db/keys');

const app = express();


// SETTINGS
app.set('port', process.env.PORT || 5000);

// MOTOR DE PLANTILLAS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// MIDDLEWARE
app.use(session({
    secret: 'secret', 
    resave: true, 
    saveUninitialized: true
}));

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

// VARIABLES GLOBALES
app.use((req, res, next) => {
    // res.status(404).render('404');
    next();
})

// RUTAS
app.use(require('./routes/appRoutes'));
app.use(require('./routes/adminRoutes'));
app.use(require('./routes/loginRoutes'));
app.use(require('./routes/venderComprarRoutes'));
app.use(require('./routes/dineroRoutes'));
app.use(require('./routes/carritoRoutes'));
app.use(require('./routes/misComprasVentasRoutes'));
app.use(require('./routes/aboutRoutes'));

// ARCHIVOS ESTATICOS
app.use(express.static(path.join(__dirname, 'public')));


app.listen(app.get('port'), (req, res)=>{
    console.log('Server running on port: ', app.get('port'));
});