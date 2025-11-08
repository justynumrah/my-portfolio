var express = require('express');
var router = express.Router();

// Homepage
router.get('/', function(req, res) {
  res.render('index', { title: 'Home' });
});

// About Page
router.get('/about', function(req, res) {
  res.render('about', { title: 'About Me' });
});

// Contact Page
router.get('/contact', function(req, res) {
  res.render('contact', { title: 'Contact Me' });
});

// Projects Page
router.get('/projects', function(req, res) {
  res.render('projects', { title: 'Projects' });
});
module.exports = router;