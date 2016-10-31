var BaseController = require("./Base");
var View = require("../views/Base");
var mgdb = require("mongodb");
var globalname = 'Records';

module.exports = BaseController.extend({
    name: globalname,
    content: null,
    run: function(req, res, next) {
        model.setDB(req.db);
        var self = this;
        this.getRecords(new mgdb.ObjectID(req.params.id),function() {
            res.render('user', {info:self.content});
        });
    },
    getRecords: function(uid,callback) {
        var self = this;
        this.content = {};
        model.getRecordList(uid,function(err, records) {
            self.content = JSON.stringify(records);
            callback();
        });
    }
});