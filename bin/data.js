//used for creating dummy data

var mongoose = require('mongoose');
var SiteFile = require('../models/siteFile');
SiteFile = mongoose.model('SiteFile');

var testDocs = [];
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

var testLayout = new SiteFile({

});
 
testDocs.push(testAbout);
testDocs.push(testIndex);

testDocs.forEach(function(doc){
	SiteFile.findOne({'name': doc.name, 'type': doc.type, 'path': doc.path}, function(err, file){
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
