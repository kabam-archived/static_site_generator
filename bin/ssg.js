/**
 * Create DocPad Instance.
 */
var docpadInstanceConfiguration = {};
require('docpad').createInstance(docpadInstanceConfiguration, function(err,docpadInstance){
    if (err)  return console.log(err.stack);
    console.log('here');
});