var mongoose = require('mongoose');
var SiteFile = require('../models/siteFile');
SiteFile = mongoose.model('SiteFile');
var assert = require("assert");
var generator = require("../bin/ssg");

var testAbout = new SiteFile({
	name: 'about',
	type: 'html.md',
	content: 'here is some **markdown**',
	siteID: 'test',
    path: 'src/documents/'
});

var testIndex = new SiteFile({
	name: 'index',
	type: 'html',
	content: '---\ntitle: "Welcome!"\nlayout: "default"\nisPage: true\n---\n\n<p>Welcome to My Website!</p>',
	siteID: 'test',
	path: 'src/documents/'
});

var site = generator.static_site;

describe('Site File Schema', function(){

  describe('new record', function(){

    it('a SiteFile record should exist', function(){  
      assert(testAbout);
      assert.equal(testAbout.name, 'about');
    })

    it('require parameters when requesting a single document', function(){
    	assert.equal(site.getFile({}), undefined);
    })

    it('finds a single document', function(done){
    	site.getFile({'name': testAbout.name}, done);
    })

    it('returns a document collection', function(done){
    	site.getFiles({}, done);
    })

    it('requires parameters to insert a new document', function(){
    	assert.equal(site.insertFile({}, undefined));
    })

    it('inserts a new document if it does not exist', function(done){
    	site.insertFile(testIndex,done);
    })
   
    it('should save the file if it doesnt exist', function(done){
    	SiteFile.find({'name': testAbout.name, 'type': testAbout.type, 'path': testAbout.path}).remove();
		SiteFile.findOne({'name': testAbout.name, 'type': testAbout.type, 'path': testAbout.path}, function(err, file){
 			if (err) {
     			console.log(err.name);
     			return;
  			}
  			if (!file){
    			console.log('file not Found creating...');
    			testAbout.save();
    			done();
    			return;
  			}
  			console.log('File found please rename your file');
  			done();
		});
    })


  })
})