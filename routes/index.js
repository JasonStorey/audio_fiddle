/*
 * GET home page.
 */

var APP_DIR = './public/';

exports.index = function(req, res){
  res.sendfile(APP_DIR + 'index.html');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};