const express = require('express');
const chalk = require('chalk');

const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');

const dotenv = require('dotenv').config();

const app = express();

connectDB();

app.use(express.json()); // When we want check the body from request, we'll use this express.json()

const PORT = process.env.PORT || 8080;

app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// To Handle Errors
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(chalk.blue.inverse.italic(`Server Running on port ${PORT} `))
});