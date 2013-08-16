
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Le Secret Venue' });
};

exports.test = function(req, res){
  res.render('test');
};