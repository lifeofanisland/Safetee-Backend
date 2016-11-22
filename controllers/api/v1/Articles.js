var safetee_buffer = require('../../../models/Safetee_Head_Buffer');

module.exports = safetee_buffer.safetee_base_controller.extend({
    //
    run: function(req, res, next) {
        //
        safetee_buffer.safetee['articles'].find({},function(err, articles) {
            //
            safetee_buffer.safetee_response.returnresponse['send'](articles);
        });
        //
    }
});