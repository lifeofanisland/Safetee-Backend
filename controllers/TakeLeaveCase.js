var BaseController = require("./Base"),
    View = require("../views/Base"),
    mgdb = require('mongodb'),
    globalname = 'Take or Leave Case';

module.exports = BaseController.extend({
    name: globalname,
    content: null,
    run: function(req, res, next) {
        model.setDB(req.db);
        var self = this;
        var type = req.body.type;
        if(type == "takecase") {
            this.takeCase(new mgdb.ObjectID(req.body.caseid),req.session.uid,function () {
                model.getARecord(new mgdb.ObjectID(req.body.caseid),function(err, recordsx) {
                    console.log(JSON.stringify(recordsx));
                    res.send(JSON.stringify(recordsx));
                });
            });
        }else if (type == "leavecase"){
            this.leaveCase(new mgdb.ObjectID(req.body.caseid),req.session.uid,function () {
                res.send("Case dropped");
            });
        }
    },
    takeCase: function(cid,uid,callback) {
        var self = this;
        this.content = {};
        model.addAgentInRecord(cid,uid,function(err, records) {
            self.content = records;
            callback();
        });
    },
    leaveCase: function(cid,uid,callback) {
        var self = this;
        this.content = {};
        model.removeAgentInRecord(cid,uid,function(err, records) {
            self.content = records;
            callback();
        });
    }
});