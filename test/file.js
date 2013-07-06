var mongoose = require('mongoose');
var mongoFile = require('../models/mongoFile');
MongoFile = mongoose.model('MongoFile');
var assert = require("assert");


describe('Mongo File Schema', function(){

  describe('new record', function(){
  
	var testAbout = new MongoFile({
		name: 'about',
		type: 'md',
		content: 'here is some **markdown**',
		siteID: 'test',
    	path: 'src/documents/'
	});

    it('a MongoFile record should exist', function(){  
      assert(testAbout);
    })

    it('should save the file if it doesnt exist, ignore it if it does', function(done){
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