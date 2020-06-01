'use strict';

const {server}=require('../lib/server');
const serverMod = require('../lib/server');
const supertest = require('supertest');
const mockRequest = supertest(server);
jest.spyOn(console,'log');

describe('web Server',()=>{
  it('add object in product(POST)',()=>{
    let output = {
      category: 'electronic',
      name: 'phone',
      display_name: 'smart phone',
      description: 'ios',
    };
    return mockRequest
      .post('/products')  
      .send(output)
      .then(result =>{
        output.id = 1;
        expect(result.body).toEqual(output);
        expect(result.status).toEqual(200);
      });
  });
  it('add object in category(POST)',()=>{
    let output = {
      category: 'electronic',
      name: 'phone',
      display_name: 'smart phone',
      description: 'ios',
    };
    return mockRequest
      .post('/categories')  
      .send(output)
      .then(result =>{
        output.id = 1;
        expect(result.body).toEqual(output);
        expect(result.status).toEqual(200);
      });
  });
  it('read all data from products GET',()=>{
    return mockRequest
      .get('/products')
      .then(result =>{
        expect(result.status).toEqual(200);
      });
  });
  it('read all data from categories GET',()=>{
    return mockRequest
      .get('/categories')
      .then(result =>{
        expect(result.status).toEqual(200);
      });
  });
  it('read id from category GET',()=>{
    return mockRequest
      .get('/categories/1')
      .then(result =>{
        expect(result.status).toEqual(200);
      });
  });
  it('read id from product GET',()=>{
    return mockRequest
      .get('/products/1')
      .then(result =>{
        expect(result.status).toEqual(200);
      });
  });
  it('update on product PUT',()=>{
    return mockRequest
      .put('/products/1')
      .then(result=>{
        expect(result.status).toEqual(200);
      });
  });
  it('update on category PUT',()=>{
    return mockRequest
      .put('/categories/1')
      .then(result=>{
        expect(result.status).toEqual(200);
      });
  });
  it('delete on product DELETE',()=>{
    return mockRequest
      .delete('/products/1')
      .then(result=>{
        expect(result.status).toEqual(200);
      });
  });
  it('delete on category DELETE',()=>{
    return mockRequest
      .delete('/categories/1')
      .then(result=>{
        expect(result.status).toEqual(200);
      });
  });
  it('should respond with 500', ()=> {
        
    return mockRequest.get('/bad')
      .then(results=> {
        expect(results.status).toBe(500);
      }).catch(console.error);
  });
  it('not Found',()=>{
    return mockRequest
      .get('/set')
      .then(result=>{
        expect(result.status).toEqual(404);
      });
  });
  it('listen to port',()=>{
    serverMod.start();
    expect(console.log).toHaveBeenCalled();
  });
 
});