
var fs = require('fs');
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

var site = exports.static_site;
//test object
(function(){

site.setOpts({
    		text: 'here is some **markdown**',
    		filename:'markdown',
    		renderSingleExtensions:true
		});

//site.setOpts({path: 'readme.md', out: 'readme.html',
//    renderSingleExtensions:true})

//generate files in src folder by default, outputs to out folder
site.getInstance(site.getGenerateCallback());
//site.writeFile(site.getOpts());
	

})()




