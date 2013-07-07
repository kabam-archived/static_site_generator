var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/ssg_dev');


 var siteFileSchema = mongoose.Schema({
    name: String,
    type: String,
    content: String,
    siteID: String,
    path: String,
},{ collection: 'siteFiles' });

var SiteFile = mongoose.model('SiteFile', siteFileSchema);
