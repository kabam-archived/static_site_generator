var mongoose = require('mongoose');
var mongoFile = require('../models/mongoFile');
MongoFile = mongoose.model('MongoFile');
var assert = require("assert");

var testAbout = new MongoFile({
	name: 'about',
	type: 'html.md',
	content: 'here is some **markdown**',
	siteID: 'test',
    path: 'src/documents/'
});

var testIndex = new MongoFile({
	name: 'index',
	type: 'html',
	content: '---\ntitle: "Welcome!"\nlayout: "default"\nisPage: true\n---\n\n<p>Welcome to My Website!</p>',
	siteID: 'test',
	path: 'src/documents/'
});

describe('Mongo File Schema', function(){

  describe('new record', function(){

    it('a MongoFile record should exist', function(){  
      assert(testAbout);
    })

    it('should save the file if it doesnt exist', function(done){
    	MongoFile.find({'name': testAbout.name, 'type': testAbout.type, 'path': testAbout.path}).remove();
		MongoFile.findOne({'name': testAbout.name, 'type': testAbout.type, 'path': testAbout.path}, function(err, file){
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