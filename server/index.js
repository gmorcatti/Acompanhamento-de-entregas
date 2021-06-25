
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const dotenv = require('dotenv');
dotenv.config();

const routes = require('./src/config/routes');
routes(app);

app.listen(3000, () => {
    console.log('listening on 3000')
})