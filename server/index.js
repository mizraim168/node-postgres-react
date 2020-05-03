//Imports
const express = require('express');
const morgan = require('morgan');
const app = express();
const {pool} = require('./database');
const cors = require('cors');
//Settings
app.set('port', process.env.PORT || 4000);

//Middleswares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:3000'}));

//Routes
app.use('/users',require('./routes/users.routes'));

//Server listen
app.listen(4000, ()=> {
    console.log("Server On Port ", app.get('port'))
});
