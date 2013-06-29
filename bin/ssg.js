var docpad = require('docpad');
/**
 * Static Site namespace
 */
exports.static_site = function()
{
	/**
 	* Object to set configuration settings
 	*/
	var docpadInstanceConfiguration = {};
	var doc;
	var opts = {};
	var cb = {

		renderJSON: function(err,docpadInstance){
    		if (err)  return console.log(err.stack);
    		docpadInstance.action('render', opts, function(err,result){
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
 	* Creates a Docpad instance
 	*/
	var renderObj = function(){
		docpad.createInstance(docpadInstanceConfiguration, cb.renderJSON);
	} 

	var generateDoc = function(){
		docpad.createInstance(docpadInstanceConfiguration, cb.generate);
	} 

	/**
	* publically accessibly methods
	*/
	return {
		setOpts: function(obj){
			opts = obj;
		},

		getOpts: function(){
			return opts;
		},

		render: renderObj,

		generateSite: generateDoc		
		
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

site.setOpts({path: 'readme.md', out: 'readme.html',
    renderSingleExtensions:true})

//site.render();
//generate files in src folder by default, outputs to out folder
site.generateSite();
	

})()




