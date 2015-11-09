var bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    csrf = require('csurf'),
    express = require('express'),
    port = 8080,
    session = require('express-session'),
    _  = require('underscore');

// setup route middlewares
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });

var app = express();

function csrfValue(req) {
    var token = (req.body && req.body._csrf)
        || (req.query && req.query._csrf)
        || (req.headers['x-csrf-token'])
        || (req.headers['x-xsrf-token']);
    return token;
};

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    session({
        secret: 'fuckingmillenials',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    })
);
app.use(csrfProtection);


// app.use(function (req, res, next) {
//     res.cookie('_csrf', req.csrfToken());
//     res.cookie('XSRF-TOKEN', req.csrfToken());
//     next();
// });

// app.use(checkIfLoggedIn);
app.use(express.static(__dirname + '/client/dist'));

app.use('/', require('./server/controllers/defaultController.js'))

// _.each(['defaultController'],
//     function(cname) {
//         console.log('Registering controller: ' + cname);
//         var ctrl = require('./server/controllers/' + cname);
//         ctrl.register(app);
//     }
// );

app.listen(port, function() {
    console.log('Server is listening on port: ' + port);
});
