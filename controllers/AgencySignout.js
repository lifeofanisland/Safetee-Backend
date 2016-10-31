var BaseController = require("./Base");

module.exports = BaseController.extend({
    content: null,
    run: function(req, res, next) {
        req.session.destroy();
        res.redirect('/agency/dashboard');
    }
});