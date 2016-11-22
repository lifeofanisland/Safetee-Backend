var safetee_buffer = require('../../models/Safetee_Head_Buffer');

module.exports = safetee_buffer.safetee_base_controller.extend({
    //
    run: function(req, res, next) {
        //
        req.session.destroy();
        res.redirect('/agency/dashboard');
    }
});