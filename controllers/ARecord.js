var BaseController = require("./Base"),
    mgdb = require('mongodb'),
    View = require("../views/Base"),
    globalname = "Record";

module.exports = BaseController.extend({
    content: null,
    run: function(req, res, next) {
        model.setDB(req.db);
        var self = this;
        model.getARecord(new mgdb.ObjectID(req.params.id),function(err, records) {
            self.content = JSON.stringify(records);
            res.render('user', {info:self.content});
        });
    }
});