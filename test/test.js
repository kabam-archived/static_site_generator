var assert = require("assert");
var generator = require("../bin/ssg");
var docpad = require('docpad');
//set testing config
var docpadInstanceConfiguration = {};

describe('static site namespace', function(){

  describe('site generator', function(){
    var site = generator.static_site;
    var testOpts = {
      text: 'here is some **markdown**',
      filename:'markdown',
      renderSingleExtensions:true
    };

    it('a site object should exist', function(){  
      assert(site);
    });

    it('rendering options should be set', function(){
      site.setOpts(testOpts);
      assert.deepEqual(testOpts, site.getOpts());
    });

    it('configuration options should be set', function(){
      site.setConfig(docpadInstanceConfiguration);
      assert.deepEqual(docpadInstanceConfiguration, site.getConfig());
    });

    it('generates a site without error', function(done){   
      site.getInstance(function(err, docpadInstance){
        docpadInstance.action('generate', function(result){
          done();
        });
      });
    });
  });
});