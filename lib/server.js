'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
// require middleware
const timeStam = require('../middleware/timestamp');
const logReq = require('../middleware/logger');
const notFound = require('../middleware/404');
const errorHandler = require('../middleware/500');
app.use(express.json());
//use middleware
app.use(timeStam.requestTime,logReq);
//global variable
let resultsProduct = [];
let resultsCat = [];

let countProduct;
let countCat;


//POST (CREATE)
//product
app.post('/products',(req, res) => {
  let data = req.body;
  let output = {
    category: data.category,
    name: data.name,
    display_name: data.display_name,
    description: data.description,
  };
  resultsProduct.push(output);
  countProduct = resultsProduct.length;
  output.id = countProduct;
  res.json(output);
});
//category
app.post('/categories',(req, res) => {
  let data = req.body;
  let output = {
    category: data.category,
    name: data.name,
    display_name: data.display_name,
    description: data.description,
  };
  resultsCat.push(output);
  countCat = resultsCat.length;
  output.id = countCat;
  res.json(output);
});

//GET (READ)
//product
app.get('/products',(req, res) => {
  res.json(resultsProduct);
});
app.get('/products/:id',(req, res) => {
  let id = Number(req.params.id);
  let findProductById = resultsProduct.filter(val =>{return val.id === id;});
  res.json(findProductById[0]);
});
//categories
app.get('/categories',(req, res) => {
  res.json(resultsCat);
});
app.get('/categories/:id',(req, res) => {
  let id = Number(req.params.id);
  let findProductById = resultsCat.filter(val =>{return val.id === id;});
  res.json(findProductById[0]);
});
  
//PUT (UPDATE)
//product
app.put('/products/:id',(req, res) => {
  let id = Number(req.params.id);
  let data = req.body;
  let output = {
    category: data.category,
    name: data.name,
    display_name: data.display_name,
    description: data.description,
  };
  output.id = id;
  resultsProduct.forEach((val,i) =>{
    if(val.id == id){
      resultsProduct[i] = output;
    }
  });
  res.json(output);
});
//categories
app.put('/categories/:id',(req, res) => {
  let id = Number(req.params.id);
  let data = req.body;
  let output = {
    category: data.category,
    name: data.name,
    display_name: data.display_name,
    description: data.description,
  };
  output.id = id;
  resultsCat.forEach((val,i) =>{
    if(val.id == id){
      resultsCat[i] = output;
    }
  });
  res.json(output);
});

//DELETE
//product
app.delete('/products/:id', (req, res) => {
  let id = Number(req.params.id);
  resultsProduct.forEach((val,i) =>{
    if(val.id === id){
      resultsProduct.splice(i,1);
    }
  });
  res.json(resultsProduct);
});
//categories
app.delete('/categories/:id', (req, res) => {
  let id = Number(req.params.id);
  resultsCat.forEach((val,i) =>{
    if(val.id === id){
      resultsCat.splice(i,1);
    }
  });
  res.json(resultsCat);
});

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