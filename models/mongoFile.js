var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/ssg_dev');


 var mongoFileSchema = mongoose.Schema({
    name: String,
    fileType: String,
    content: String,
    siteID: String,
    path: String,
},{ collection: 'siteFiles' });

var MongoFile = mongoose.model('MongoFile', mongoFileSchema);
