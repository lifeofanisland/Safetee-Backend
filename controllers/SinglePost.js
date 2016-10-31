var BaseController = require("./Base"),
    mgdb = require('mongodb'),
    View = require("../views/Base"),
    globalname = "Single Post";

module.exports = BaseController.extend({
    content: null,
    run: function(req, res, next) {
        model.setDB(req.db);
        var self = this;
        model.getAPost(new mgdb.ObjectID(req.body.id),function(err, records) {
            var data = {
                "article":records
            };
            self.content = JSON.stringify(data);
            console.log(self.content);
            res.send(self.content);
        });
    }
});