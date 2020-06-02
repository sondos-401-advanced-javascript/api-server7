'use strict';

const {server}=require('../lib/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
jest.spyOn(global.console,'log');

describe('web Server',()=>{
  let output = {
    category: 'electronic',
    name: 'phone',
    display_name: 'smart phone',
    description: 'ios',
  };
  it('add object in product(POST)',()=>{
    return mockRequest
      .post('/products')  
      .send(output)
      .then(result =>{
        Object.keys(output).forEach(key =>{
          expect(result.body[key]).toEqual(output[key]);
        });
        expect(result.status).toEqual(200);
      });
  });
  it('add object in category(POST)',()=>{
    return mockRequest
      .post('/categories')  
      .send(output)
      .then(result =>{
        Object.keys(output).forEach(key =>{
          expect(result.body[key]).toEqual(output[key]);
        });
        expect(result.status).toEqual(200);
      });
  });
  it('read all data from products GET',()=>{
    return mockRequest
      .get('/products')
      .then(result =>{
        Object.keys(output).forEach(key =>{
          expect(result.body[0][key]).toEqual(output[key]);
        });
        expect(result.status).toEqual(200);
      });
  });
  it('read all data from categories GET',()=>{
    return mockRequest
      .get('/categories')
      .then(result =>{
        Object.keys(output).forEach(key =>{
          expect(result.body[0][key]).toEqual(output[key]);
        });
        expect(result.status).toEqual(200);
      });
  });
  it('read id from category GET',()=>{
    return mockRequest
      .get('/categories/5ed64e7307d94b15dee00d28')
      .then(result =>{
        expect(result.status).toEqual(200);
      });
  });
  it('read id from product GET',()=>{
    return mockRequest
      .get('/products/5ed64e7307d94b15dee00d28')
      .then(result =>{
        expect(result.status).toEqual(200);
      });
  });
  it('update on product PUT',()=>{
    return mockRequest
      .put('/products/5ed64e7307d94b15dee00d28')
      .then(result=>{
        expect(result.status).toEqual(200);
      });
  });
  it('update on category PUT',()=>{
    return mockRequest
      .put('/categories/5ed64e7307d94b15dee00d28')
      .then(result=>{
        expect(result.status).toEqual(200);
      });
  });
  it('delete on product DELETE',()=>{
    return mockRequest
      .delete('/products/5ed64e7307d94b15dee00d28')
      .then(result=>{
        expect(result.status).toEqual(200);
      });
  });
  it('delete on category DELETE',()=>{
    return mockRequest
      .delete('/categories/5ed64e7307d94b15dee00d28')
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
  it('add object in category(POST)',()=>{
    let obj = {
      category: 'electronic',
      name: 'phone',
    };
    return mockRequest
      .post('/categories')  
      .send(obj)
      .then(result =>{
        expect(result.status).toEqual(500);
      });
  });
 
});