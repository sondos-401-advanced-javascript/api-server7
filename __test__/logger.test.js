'use strict';

const loggerMiddleWare = require('../middleware/logger');

describe('logger', () => {

  let consoleSpy;
  let req = {};
  let res = {};
  let next = jest.fn(); 
  beforeEach(()=> {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(()=> {
    consoleSpy.mockRestore();
  });

  it ('console request', ()=> {
    loggerMiddleWare(req, res, next);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('for the next function', ()=> {
    loggerMiddleWare(req, res, next);
    expect(next).toHaveBeenCalled();
  });


});