var assert = require("assert");
var generator = require("../bin/ssg");
var docpad = require('docpad');
//set testing config
var docpadInstanceConfiguration = {pluginsPaths: ['../node_modules','plugins'], outPath: '../out', srcPath: '../src'};

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

    it('rendering options should be set', function(){
      site.setOpts(testOpts);
      assert.deepEqual(testOpts, site.getOpts());
    })

    it('configuration options should be set', function(){
      site.setConfig(docpadInstanceConfiguration);
      assert.deepEqual(docpadInstanceConfiguration, site.getConfig());
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

    it('renders json to html without error', function(done){  
      site.setOpts({path: '../readme.md', out: '../out/readme.html', renderSingleExtensions:true});
      site.getInstance(function(err, docpadInstance){
        docpadInstance.action('render', site.getOpts(), function(err,result){
          if (err)  return console.log(err.stack);
          console.log(result);
          done();
        });
      })
    })

    it('can write a json file to markdown', function(done){   
      site.writeFile(testOpts, done);
    })

  })
})