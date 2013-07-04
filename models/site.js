//var env = process.env.NODE_ENV || 'development'
//, config = require('yaml-config').readConfig('config/config.yml', env)
var mongoose = require('mongoose')
//mongoose.connect('mongodb://localhost/ssg_dev');
//var db = mongoose.connection;

 var siteSchema = mongoose.Schema({
    name: String
});

var Site = mongoose.model('Site', siteSchema);
