var BaseController = require("./Base"),
    mgdb = require('mongodb'),
    View = require("../views/Base"),
    globalname = "Index";

module.exports = BaseController.extend({
    content: null,
    run: function(req, res, next) {
        model.setDB(req.db);
        res.render('index');
    }
});