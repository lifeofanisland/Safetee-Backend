var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config')();
var app = express();
var mongoose = require('mongoose');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore(
    {
        uri: 'mongodb://' + config.mongo.host + ':' + config.mongo.port + '/safeteedb',
        collection: 'mySessions',
        clear_interval: 3600
    });

//Pages
var Index = require('./controllers/Index');

//API v1
var api_ver_folder = "api/v1/";
//
var Signup = require('./controllers/'+api_ver_folder+'Signup');
var Signin = require('./controllers/'+api_ver_folder+'Signin');
var NewRecord = require('./controllers/'+api_ver_folder+'NewRecord');
var AudioUpload = require('./controllers/'+api_ver_folder+'AudioUpload');
var Records = require('./controllers/'+api_ver_folder+'Records');
var ARecord = require('./controllers/'+api_ver_folder+'ARecord');
var Tips = require('./controllers/'+api_ver_folder+'SafeteeTips');
var ATip = require('./controllers/'+api_ver_folder+'ASafeteeTip');
var AgenciesAround = require('./controllers/'+api_ver_folder+'AgenciesAround');
var AnAgencyAround = require('./controllers/'+api_ver_folder+'AnAgencyAround');
var PutCircle = require('./controllers/'+api_ver_folder+'PutCircles');
var RecordStream = require('./controllers/'+api_ver_folder+'RecordStream');
var Subscribe = require('./controllers/'+api_ver_folder+'Subscribe');
var Donate = require('./controllers/'+api_ver_folder+'Donate');
var Settings = require('./controllers/'+api_ver_folder+'Settings');

//Agency
var agency_folder = "agency/";
var AgencySignup = require('./controllers/'+agency_folder+'AgencySignup');
var AgencySignin = require('./controllers/'+agency_folder+'Dashboard');
var AgencySignout = require('./controllers/'+agency_folder+'AgencySignout');
var TakeLeaveCase = require('./controllers/'+agency_folder+'TakeLeaveCase');

//Admin
var ContentDriver = require('./controllers/admin/ContentDriver');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/templates');
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('safetee-backend-run-on-rocks'));
app.use(require('express-session')({
    secret: 'safetee_backend_rocks_on_Micassa_!!!!',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    },
    store: store,
    resave: false,
    saveUninitialized: true
}));
app.use(app.router);
app.use(require('less-middleware')({src: __dirname + '/public'}));
app.use(express.static(path.join(__dirname, 'public')));

//
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
//
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/safeteedb', function (err, db) {
    if (err) {
        console.log('Sorry, there is no mongo db server running.');
    } else {

        //API Run
        //
        app.all('/', function (req, res, next) {
            Index.run(req, res, next);
        });
        app.all('/api/v1/user/signup', function (req, res, next) {
            Signup.run(req, res, next);
        });
        app.all('/api/v1/user/login', function (req, res, next) {
            Signin.run(req, res, next);
        });
        app.all('/api/v1/user/circle/add', function (req, res, next) {
            PutCircle.run(req, res, next);
        });
        app.all('/api/v1/record/add', function (req, res, next) {
            NewRecord.run(req, res, next);
        });
        app.all('/api/v1/audio/upload', function (req, res, next) {
            AudioUpload.run(req, res, next);
        });
        app.all('/api/v1/records/get/:id', function (req, res, next) {
            Records.run(req, res, next);
        });
        app.all('/api/v1/record/get/:id', function (req, res, next) {
            ARecord.run(req, res, next);
        });
        app.all('/api/v1/tips/get', function (req, res, next) {
            Tips.run(req, res, next);
        });
        app.all('/api/v1/tip/get/:id', function (req, res, next) {
            ATip.run(req, res, next);
        });
        app.all('/api/v1/agencies/get/:id', function (req, res, next) {
            AgenciesAround.run(req, res);
        });
        app.all('/api/v1/agency/get/:id', function (req, res, next) {
            AnAgencyAround.run(req, res, next);
        });
        app.all('/api/v1/subscribe', function (req, res, next) {
            Subscribe.run(req, res, next);
        });
        app.all('/api/v1/donate', function (req, res, next) {
            Donate.run(req, res, next);
        });
        app.all('/api/v1/user/setting', function (req, res, next) {
            Settings.run(req, res, next);
        });
        //Agency Run
        //
        app.all('/agency/signup', function (req, res, next) {
            AgencySignup.run(req, res, next);
        });
        app.all('/agency/dashboard', function (req, res, next) {
            AgencySignin.run(req, res, next);
        });
        app.all('/agency/logout', function (req, res, next) {
            AgencySignout.run(req, res, next);
        });
        app.all('/agency/record', function (req, res, next) {
            RecordStream.run(req, res, next);
        });
        app.all('/agency/takeleavecase', function (req, res, next) {
            TakeLeaveCase.run(req, res, next);
        });
        //Admin
        //
        app.all('/web/admin',  function (req, res, next) {
            res.redirect('/app/home')
        });
        //
        app.all('/app/:id',  function (req, res, next) {
            ContentDriver.run(req, res, next);
        });
        //
        http.createServer(app).listen(app.get('port'), function () {
            console.log(
                'Successfully connected to mongodb://' + config.mongo.host + ':' + config.mongo.port,
                '\nServer listening on port 3000'
            );
        });
    }
});