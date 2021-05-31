// IMPORTS
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();


// SETTINGS
app.set('port', process.env.PORT || 5000);

// MOTOR DE PLANTILLAS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

// RUTAS
app.use(require('./routes/appRoutes'));

// ARCHIVOS ESTATICOS
app.use(express.static(path.join(__dirname, 'public')));


app.listen(app.get('port'), (req, res)=>{
    console.log('Server running on port: ', app.get('port'));
});