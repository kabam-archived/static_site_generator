var mongoose = require('mongoose')
var config = require('yaml-config');
var settings = config.readConfig('../../../config/config.yaml');
console.log(settings.db);
mongoose.connect(settings.db);


 var siteFileSchema = mongoose.Schema({
    name: String,
    type: String,
    content: String,
    siteID: String,
    path: String,
},{ collection: 'siteFiles' });

var SiteFile = mongoose.model('SiteFile', siteFileSchema);
