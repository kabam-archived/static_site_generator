var assert = require("assert");
var generator = require("../ssg");
var docpad = require('docpad');
//set testing config
var docpadInstanceConfiguration = {};

describe('static site namespace', function(){

  describe('site generator', function(){
    var testOpts = {
      text: 'here is some **markdown**',
      filename:'markdown',
      renderSingleExtensions:true
    };

    it('a site object should exist', function(){  
      assert(generator);
    });

    it('rendering options should be set', function(){
      generator.setOpts(testOpts);
      assert.deepEqual(testOpts, generator.getOpts());
    });

    it('configuration options should be set', function(){
      generator.setConfig(docpadInstanceConfiguration);
      assert.deepEqual(docpadInstanceConfiguration, generator.getConfig());
    });

    it('generates a site without error', function(done){   
      generator.getInstance(function(err, docpadInstance){
        docpadInstance.action('generate', function(result){
          done();
        });
      });
    });
  });
});