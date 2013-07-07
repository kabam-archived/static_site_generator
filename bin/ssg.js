var fs = require('fs');
var mkdirp = require('mkdirp');
var mongoose = require('mongoose');
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

	//return files in array
	var getFiles = function(opts, next){
		if(!opts) opts = {};
		MongoFile.find(opts, function (err, files){
		  var counter = files.length;
		  var returnObject = [];
		  files.forEach(function(file) {  	
		      returnObject.push(file);     
		  });
			next(returnObject);
		});
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
  					//next();
				});	
			});			
		});
		next(); 	
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

		getFiles: getFiles,	

		writeFile: writeFile
		
	};

}();


var site = exports.static_site;
//test object
(function(){

	var callback = function (obj) {
		site.writeFile(obj, function(){console.log('complete');});
	}

	site.getFiles(null, callback);

})()




