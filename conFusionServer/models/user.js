var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

//no need to add name and password 
//in addition to username and password , it will have following feilds
var User = new Schema({
    firstname: {
        type: String,
          default: ''
      },
      lastname: {
        type: String,
          default: ''
      },
    admin:   {
        type: Boolean,
        default: false
    }
});

//passport automatically adds it to schema
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);