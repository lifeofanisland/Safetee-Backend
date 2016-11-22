var safetee_buffer = require('../../../models/Safetee_Head_Buffer');

module.exports = safetee_buffer.safetee_base_controller.extend({
    //
    run: function(req, res, next) {
        //
        safetee_buffer.safetee['articles'].find({_id:req.params.id},function(err, article) {
            //
            safetee_buffer.safetee_response.returnresponse['send'](article);
        });
        //
    }
});