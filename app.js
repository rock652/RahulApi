require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect');

const PORT = process.env.PORT || 5000;
const products_routes = require('./routes/products');

app.get('/', (req, res) => {
  res.send('Hii , Im live');
});

//middleware or to set router
app.use('/api/products', products_routes);
app.use('/api/products/testing', products_routes);

const start = async (req, res) => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`${PORT} Yes I am connectd`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
