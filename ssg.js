require('./models/siteFile');
var fs = require('fs'),
mkdirp = require('mkdirp'),
docpad = require('docpad'),
SiteFile = require('mongoose').model('SiteFile');

/**
 * Static Site namespace
 * Module Pattern
 */
var static_site = function()
{
	/**
	* Object to set configuration settings
	*/	
	var docpadInstanceConfiguration, opts = {};
	/**
	* DocPad callbacks used to call docpad methods
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
	};
	/**
	* Database functions
	*/
	var dbInterface = {

		getAllSites: function(opts, next){
			SiteFile.find({}, {'_id': 0, 'siteID': 1}, function (err, sites){
				if(err) return;
				console.log(sites);
				next(sites);
			});
		},

		//return files in array
		getFiles: function(opts, next){
			if(!opts) opts = {};
			SiteFile.find(opts, function (err, files){
				var counter = files.length;
				var returnObject = [];
				files.forEach(function(file) {
					returnObject.push(file);
				});
				next(err, returnObject);
			});
		},

		getFile: function(opts, next){
			if(!opts || Object.keys(opts).length === 0) return;
			SiteFile.findOne(opts, function(err, obj){
				if(err) return;
				console.log(obj);
				next();
			});		
		},

		insertFile: function(doc, next){
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
		},

		updateFile: function(query, opts, next){
			if(!opts || Object.keys(opts).length === 0) return;
			SiteFile.update(query,opts, function (err, numberAffected, raw) {
				if (err) return handleError(err);
				console.log('The number of updated documents was %d', numberAffected);
				console.log('The raw response from Mongo was ', raw);
				next();
			});
		},

		deleteFile: function(query, next){
			if(!query || Object.keys(query).length === 0) return;

		}
	};

	//write files to src directory
	var writeFile = function(obj, next){
		obj.forEach(function(file){
			//create path if it doesn't exist
			mkdirp(file.path, function(err) { 
				if(err) return console.log(err);
				console.log(file.path + ' created or exists');
				//write file
				fs.writeFile(file.path.full, file.content, function (err) {
					if (err) return console.log(err);
					console.log(file.path + file.name + '.' + file.type);
					console.log(file.content);
					next();
				});	
			});			
		});	
	};
	/**
	* Creates a Docpad instance
	*/
	var instance = function(cb){
		docpad.createInstance(docpadInstanceConfiguration, cb);
	};

	/**
	* publically accessible methods
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

		getSites: dbInterface.getAllSites,

		getFiles: dbInterface.getFiles,	

		getFile: dbInterface.getFile,

		insertFile: dbInterface.insertFile,

		updateFile: dbInterface.updateFile,

		writeFile: writeFile
		
	};

}();

 module.exports = static_site;


