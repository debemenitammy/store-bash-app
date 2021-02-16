require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const authRoute = require('./routes/auth.route');
const suggestionRoute = require('./routes/suggestion.route');
const documentationRoute = require('./routes/documentation.route');

const port = process.env.PORT || 3000;
const corsOptions = {
    "origin": "*",
    optionsSuccessStatus: 200
}

//middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

//routes
app.use('/', documentationRoute);
app.use('/api', authRoute);
app.use('/api', suggestionRoute);

//Connection to mongoose

try {
    mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, () => console.log('Connected to DB'));
} catch (error) {
    console.log(`connection failed!! ${error}`)
}


app.listen(port, (() => console.log(`server started on port ${port}`)));