const mongoose = require('mongoose');
const chalk = require('chalk');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(chalk.green.inverse.italic('Database Connected =>', connect.connection.name, '-' ,connect.connection.host));
    } catch(err) {
        console.log(chalk.red.bold.inverse('DB_CONNECTION_ERROR ', err));
        process.exit(1);
    }
}

module.exports = connectDB;