const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

console.log('MongoDB URI:', process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

// Define routes here
const itemsRouter = require('./routes/items');
app.use('/items', itemsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});