const mongoose = require('mongoose');
mongoose.set('debug', true);

mongoose.connect('mongodb://localhost/craved_meals')
.then(() => {
    console.log("Connected to Database");
})
.catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
});

mongoose.Promise = Promise;
module.exports.Menu = require('./menu');
module.exports.Order = require('./order');
module.exports.User = require('./user');
module.exports.Feedback = require('./feedback');
