//used for creating dummy data

var mongoose = require('mongoose');
var mongoFile = require('../models/mongoFile');
MongoFile = mongoose.model('MongoFile');

var testDocs = [];
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
 
testDocs.push(testAbout);
testDocs.push(testIndex);

testDocs.forEach(function(doc){
	MongoFile.findOne({'name': doc.name, 'type': doc.type, 'path': doc.path}, function(err, file){
	 	if (err) {
	     	console.log(err.name);
	     	return;
	  	}
	  	if (!file){
	    	console.log('file not Found creating...');
	    	doc.save();
	    	return;
	  	}
	  		console.log('File found please rename your file');
	});
});
