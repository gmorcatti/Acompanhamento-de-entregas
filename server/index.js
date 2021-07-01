
const express = require('express');
const app = express();

const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());

const dotenv = require('dotenv');
dotenv.config();

const routes = require('./src/config/routes');
routes(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on ${port}`);
})