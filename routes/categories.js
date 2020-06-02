'use strict';

const express = require('express');
const route = express.Router();
const categoryCrud = require('../lib/models/categories/categories.collection');
//add category (POST)
route.post('/categories',postCategories);
function postCategories (req, res,next){
  let data = req.body;
  categoryCrud.create(data)
    .then(categoryAdded=>{
      res.json(categoryAdded);
    })
    .catch(next);
}
//find All categories (GET)
route.get('/categories',getAllCategories);
function getAllCategories(req, res,next) {
  categoryCrud.get()
    .then(allCategories =>{
      res.json(allCategories);
    })
    .catch(next);
}
//find category By Id (GET)
route.get('/categories/:id',getByIdCategory);
function getByIdCategory(req, res,next){
  let id = req.params.id;
  categoryCrud.get(id)
    .then(categoryId =>{
      res.json(categoryId);
    })
    .catch(next);
}
//update specific catgeroy By Id (PUT)
route.put('/categories/:id',updateCategory);
function updateCategory(req, res,next) {
  let id = req.params.id;
  let data = req.body;
  categoryCrud.update(id,data)
    .then(updatedCategory =>{
      res.json(updatedCategory);
    })
    .catch(next); 
}
// delete specific catgeroy By Id (DELETE)
route.delete('/categories/:id', deleteCategory);
function deleteCategory(req, res,next) {
  let id = req.params.id;
  categoryCrud.delete(id)
    .then(result =>{
      res.json({delete:`you delete the category has Id: ${id}`});
    })
    .catch(next);
}

module.exports = route;