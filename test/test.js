var assert = require("assert");
var generator = require("../bin/ssg");
var docpad = require('docpad');

var docpadInstanceConfiguration = {outPath: '../out', srcPath: '../src'};

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
    })

    it('site options should be set', function(){
      site.setOpts(testOpts);
      assert.deepEqual(testOpts, site.getOpts())
  })

  it('generates a site without error', function(done){   
      site.getInstance(function(err, docpadInstance){
        docpadInstance.action('generate', function(err,result){
          if (err)  return console.log(err.stack);
          console.log('OK');
          done();
      });
    })
  })
  
})
})