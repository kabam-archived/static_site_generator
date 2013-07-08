var fs = require('fs');
var mkdirp = require('mkdirp');
require('../models/siteFile');
SiteFile = require('mongoose').model('SiteFile');
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
	/**
	* DocPad callbacks
	*/
	var callbacks = {
		render: function(err,docpadInstance){
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
	/**
	* Database functions
	*/
	//return files in array
	var getFiles = function(opts, next){
		if(!opts) opts = {};
		SiteFile.find(opts, function (err, files){
		  var counter = files.length;
		  var returnObject = [];
		  files.forEach(function(file) {  	
		      returnObject.push(file);     
		  });
			next(err, returnObject);
		});
	};

	var getFile = function(opts, next){
		if(!opts || Object.keys(opts).length === 0) return;
		SiteFile.findOne(opts, function(err, obj){
			if(err) return;
			console.log(obj);
			next();
		});		
	};

	var insertFile = function(doc, next){
		if(!doc || Object.keys(doc).length === 0) return;
		SiteFile.findOne({'name': doc.name, 'type': doc.type, 'path': doc.path}, function(err, file){
	 		if (err) {
	     		console.log(err.name);
	     	return;
	  		}
	  		if (!file){
	    		console.log('Creating file...');
	    		doc.save();
	  		} else {
	  			console.log('File with same name already exists please rename your file');	
	  		}
	  		next();
		});
	};

	var updateFile = function(opts, next){
		if(!opts || Object.keys(opts).length === 0) return;
	};

	//write files to src directory
	var writeFile = function(obj, next){
		obj.forEach(function(file){
			//create path if it doesn't exist
			mkdirp(file.path, function(err) { 
				if(err) return console.log(err);
				console.log(file.path + ' created or exists');
				//write file
				fs.writeFile(file.path + file.name + '.' + file.type, file.content, function (err) {
  					if (err) return console.log(err);
  					console.log(file.path + file.name + '.' + file.type);
  					console.log(file.content);
  					next();
				});	
			});			
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
			return callbacks.render;
		},

		getInstance: instance,

		getFiles: getFiles,	

		getFile: getFile,

		insertFile: insertFile,

		writeFile: writeFile
		
	};

}();


var site = exports.static_site;
//test object
(function(){

	//var callback = function (obj) {
	//	site.writeFile(obj, function(){console.log('complete');});
	//}

	//site.getFile({'name': 'about'}, callback);

})()




