var fs = require('fs');
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/test');
var mongoFile = require('../models/mongoFile');
MongoFile = mongoose.model('MongoFile');
/**
 * Static Site namespace
 */
exports.static_site = function()
{
	/**
 	* Object to set configuration settings
 	*/
 	var docpad = require('docpad');
	var docpadInstanceConfiguration, opts = {};

	var callbacks = {
		renderJSON: function(err,docpadInstance){
    		docpadInstance.action('render', opts, function(err,result){
    			if (err)  return console.log(err.stack);
    			console.log(result);
			});
		},

		generate: function(err, docpadInstance){
    		docpadInstance.action('generate', function(err,result){
    			if (err)  return console.log(err.stack);
    			console.log('OK');
			});
		}
	}

	var writeFile = function(obj, next){
    	fs.writeFile('src/documents/' + obj.filename + '.html.md', obj.text, function (err) {
  			if (err) return console.log(err);
  			console.log('result > result.html');
  			next();
		});	
	}

	/**
 	* Creates a Docpad instance
 	*/
	var instance = function(cb){
		docpad.createInstance(docpadInstanceConfiguration, cb);
	} 

	/**
	* publically accessibly methods
	*/
	return {
		setConfig: function(obj){
			docpadInstanceConfiguration = obj;
		},

		getConfig: function(){
			return docpadInstanceConfiguration;
		},

		setOpts: function(obj){
			opts = obj;
		},

		getOpts: function(){
			return opts;
		},

		getGenerateCallback: function(){
			return callbacks.generate;
		},

		getRenderCallback: function(){
			return callbacks.renderJSON;
		},

		getInstance: instance,	

		writeFile: writeFile
		
	};

}();
var testMarkdown = new MongoFile({
	name: 'markdown2',
	filetype: 'md',
	content: 'here is some **markdown**',
	siteID: 'test',
    path: '/src/documents/'
});

var site = exports.static_site;
//test object
(function(){

site.setOpts({
    		text: 'I like long!! walks on the beach. **Plus I rock at DocPad!**',
    		filename:'markdown',
    		srcPath: 'src', 
    		outPath: 'out',
    		actions: ['renderExtensions', 'renderDocument', 'renderLayouts'],
    		attributes: { meta: { title: 'About Me', layout: 'default', isPage: true, outFilename: 'about.html', srcPath: 'src', outPath: 'out', outExtension: 'html' } },
    		filename: 'about.html.md',
        	basename: 'about',
        	extension: 'md',
    		renderSingleExtensions:true
		});

//site.setOpts({path: 'readme.md', out: 'readme.html',
//    renderSingleExtensions:true})

var docpadInstanceConfiguration = {};
require('docpad').createInstance(docpadInstanceConfiguration, function(err,docpadInstance){
    if (err)  return console.log(err.stack);
    var document = docpadInstance.createDocument({
    	filename: 'markdown'
    	,body: 'I like long!! walks on the beach. **Plus I rock at DocPad!**'
    	,referencesOthers: true
    	,renderSingleExtensions: true
    	,meta: { title: 'About Me', layout: 'default', isPage: true }
    	,outFilename: 'about.html'
    	},{});
    document.renderDocument.apply(document, {});
    console.log(document);
});
//generate files in src folder by default, outputs to out folder
//site.getInstance(site.getGenerateCallback());
//site.getInstance(site.getRenderCallback())
//site.writeFile(site.getOpts());
 // testMarkdown.save();
//});


//testMarkdown.save();

})()




