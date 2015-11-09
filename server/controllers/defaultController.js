// var csrf = require('csurf'),
// 	path = require('path');

// var filePath = path.normalize(__dirname + '/../../client/dist/');

// var csrfProtection = csrf({ cookie: true });

// var _index = function(req, res) {
//     res.sendFile(filePath + 'index.html', { csrfToken: req.csrfToken() });
// };

// var _partials = function(req, res) {
//     res.sendFile(filePath + 'partials/' + req.params.name + '.html', { csrfToken: req.csrfToken() });
// };

// exports.register = function(app) {
//     app.get('/', csrfProtection, _index);
//     // app.get('/partials/:name', _partials);
//     app.get('*', csrfProtection, _index);

//     return app;
// };

var csrf = require('csurf'),
		express = require('express'),
		path = require('path');

var index = express.Router();

index.route('/').get(function(req, res) {
		res.sendFile(path.resolve('dist/index.html'), { root: __dirname, csrfToken: req.csrfToken() });
});

index.route('*').get(function(req, res) {
		res.sendFile(path.resolve('dist/index.html'), { root: __dirname, csrfToken: req.csrfToken() });
});

module.exports = index;
