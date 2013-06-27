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
	/**
 	* Creates a Docpad instance
 	*/
	var createInstance = function(){
		

		doc = docpad.createInstance(docpadInstanceConfiguration, function(err,docpadInstance){
    	if (err)  return console.log(err.stack);
    		return docpadInstance;
		});
		return doc;
		
	}

	return {

		getDocpadInstance: function(){
		return doc;
		},

		createDocpadInstance: createInstance()		
	};

}();

//test object
var renderOpts = {
    text: 'here is some **markdown**',
    filename:'markdown',
    renderSingleExtensions:true
};

exports.test = function(){
	var generator = exports.static_site;
	return generator.getDocpadInstance();
}
