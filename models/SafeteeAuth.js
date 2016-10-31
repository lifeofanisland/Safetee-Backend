//
var Auth_ = ({
    //
   get_auth: function(req) {
       return (
           req.session &&
           req.session.uid !== undefined &&
           req.session.loggedin &&
           req.session.loggedin === true
       );
   },
    //
    set_auth:function (req,credentials) {
        //
        req.session.loggedin = true;
        req.session.uid = credentials[0]._id;
        req.session.utitle = credentials[0].name;
        req.session.recordsort = 'sort records';
        req.session.save();
        //
    },

});
//
module.exports = {
    auth:Auth_
}
