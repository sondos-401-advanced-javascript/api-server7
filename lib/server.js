'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
// require middleware
const timeStam = require('../middleware/timestamp');
const logReq = require('../middleware/logger');
const notFound = require('../middleware/404');
const errorHandler = require('../middleware/500');
const categoriesRouter = require('../routes/categories');
const productsRouter = require('../routes/product');
app.use(express.json());
//use middleware
app.use(timeStam.requestTime,logReq);


//categries Router
app.use(categoriesRouter);
//products Router
app.use(productsRouter);

app.get('/bad', (req, res)=> {
  res.status(500).json({});
});

// Error Function
app.use('*',notFound);
app.use(errorHandler);


module.exports = {
  server: app,  
  start: ()=>{
    const PORT = process.env.PORT || 3000;
    app.listen(PORT,()=>{
      console.log(`Listen on Port ${PORT}`);
    });
  },
};