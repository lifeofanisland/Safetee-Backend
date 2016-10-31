//
var ReturnResponse_ = ({
    //
    send: function (req, res) {
        //
        console.log(JSON.stringify(req));
        res.send(JSON.stringify(req));
    },
    //
    render: function (req, page, initials, res) {
        res.render(
            page,
            initials
        )
    },
    //
    redirect: function (req, page, res) {
        res.redirect(page);
    }
});
//
var GetResponse_ = ({
    //
    no_form_data: function (req) {
        return 'No form data sent';
    },
   //
    error: function (req) {
        return 'Aw! snap, an error was encountered';
    },
    //
    user_signup: function (req) {
        switch (req){
            case 'exists':
                return 'User with email address, ' + req + ' exists already';
            break;
            case 'success':
                return 'Account was created';
            break;
        }
    },
    user_signin: function (req) {
        switch (req){
            case 'notfound':
                return 'incorrect login credentials';
                break;
            case 'success':
                return 'user account exists';
                break;
        }
    },
    new_record: function (req) {
        switch (req){
            case 'success':
                return 'Record successfully sent';
                break;
        }
    }
    //
});

module.exports = ({
    returnresponse:ReturnResponse_,
    getresponse:GetResponse_
});