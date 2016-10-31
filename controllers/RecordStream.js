var BaseController = require("./Base"),
    mgdb = require('mongodb'),
    View = require("../views/Base"),
    globalname = "Record Stream";

module.exports = BaseController.extend({
    content: null,
    run: function(req, res, next) {
        model.setDB(req.db);
        var self = this;
        model.getARecord(new mgdb.ObjectID(req.body.caseid),function(err, records) {
            self.content = JSON.stringify(records);
            console.log(records);
            res.render('showrecord',{recordlink:records[0].record});
        });
    }
});