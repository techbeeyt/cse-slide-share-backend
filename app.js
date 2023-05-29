const express = require('express');
const cors = require('cors');
const Router = require('./router');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config();

app.use(Router);

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => console.log(`This app is running: http://localhost:${PORT}`));