'use strict';

const express = require('express');
const route = express.Router();
const getModel = require('../middleware/getParam');

route.param('model',getModel);
route.post('/:model',postCategories);
route.get('/:model',getAll);
route.get('/:model/:id',getById);
route.put('/:model/:id',updateOne);
route.delete('/:model/:id', deleteOne);
//Add new (POST)
function postCategories (req, res,next){
  let data = req.body;
  req.model.create(data)
    .then(categoryAdded=>{
      res.json(categoryAdded);
    })
    .catch(next);
}
//find All (GET)
function getAll(req, res,next) {
  req.model.get()
    .then(allRecords =>{  
      let count = allRecords.length;
      res.json({count,allRecords});
    })
    .catch(next);
}
//find By Id (GET)
function getById(req, res,next){
  let id = req.params.id;
  req.model.get(id)
    .then(result =>{
      res.json(result);
    })
    .catch(next);
}
//update By Id (PUT)
function updateOne(req, res,next) {
  let id = req.params.id;
  let data = req.body;
  req.model.update(id,data)
    .then(result =>{
      res.json(result);
    })
    .catch(next); 
}
// delete By Id (DELETE)
function deleteOne(req, res,next) {
  let id = req.params.id;
  req.model.delete(id)
    .then(result =>{
      res.json({delete:`you delete the category has Id: ${id}`});
    })
    .catch(next);
}

module.exports = route;


