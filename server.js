import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import connection from './database/connection.js';
import pageRouter from './routers/page.js';
import checkRouter from './routers/check.js';
import jsonRouter from './routers/json.js';
import signupRouter from './routers/signup.js';
import verificationRouter from './routers/verification.js';
import loginRouter from './routers/login.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}))
app.use(express.static('static'))
app.set('view engine', 'ejs');

app.listen(port, function () {
    console.log(`Server is running on port ${port}`);
    connection();
});

app.use('/', pageRouter);
app.use('/api/check', checkRouter);
app.use('/api/json', jsonRouter);
app.use('/api/signup', signupRouter);
app.use('/api/verification', verificationRouter);
app.use('/api/login', loginRouter);
