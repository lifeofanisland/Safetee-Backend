var BaseController = require("./Base"),
    View = require("../views/Base"),
    mongoose = require('mongoose'),
    globalname = "Articles";
module.exports = BaseController.extend({
    content: null,
    run: function(req, res, next) {
        var self = this;
        mongoose.model('articles').find({}, function (err, records) {
            if (err) {
                return console.error(err);
            } else {
                self.content = JSON.stringify(records);
                console.log(self.content);
                res.send(self.content);
            }
        });
    }
});