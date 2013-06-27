var assert = require("assert");
var generator = require("../bin/ssg");
var docpad = require('docpad');

var docpadInstanceConfiguration = {};

describe('static site namespace', function(){
  describe('#createDocpadInstance()', function(){
    it('a docpad instance should exist', function(){
     var doc = generator.test();
      assert(doc);
    })
  })
})