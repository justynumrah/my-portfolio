// Import required modules
var createError = require('http-errors'); // For handling HTTP errors like 404
var express = require('express');         // Core Express framework
var path = require('path');               // Helps with file and directory paths
var cookieParser = require('cookie-parser'); // Parses cookies from incoming requests
var logger = require('morgan');           // Logs HTTP requests to the console

// Import route files
var indexRouter = require('./routes/index'); // Main routes (home, about, contact, etc.)
var usersRouter = require('./routes/users'); // Placeholder for user-related routes

// Create the Express app
var app = express();

// --------------------
// View Engine Setup
// --------------------

// Set the folder where EJS templates are stored
app.set('views', path.join(__dirname, 'views'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// --------------------
// Middleware Setup
// --------------------

// Log requests in the terminal (e.g., GET /about)
app.use(logger('dev'));

// Parse incoming JSON data
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: false }));

// Parse cookies from the request headers
app.use(cookieParser());

// Serve static files (CSS, images, JS) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// --------------------
// Route Handling
// --------------------

// Use indexRouter for all base routes (/, /about, /contact, etc.)
app.use('/', indexRouter);

// Use usersRouter for any /users routes (optional, can be removed if unused)
app.use('/users', usersRouter);

// --------------------
// Error Handling
// --------------------

// Catch 404 errors and forward them to the error handler
app.use(function(req, res, next) {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// Handle all errors (including 404 and server errors)
app.use(function(err, req, res, next) {
  // Set local variables for the error page
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page with status code
  res.status(err.status || 500);
  res.render('error', {
    title: 'Error',
    message: err.message,
    error: err
  });
});

// Export the app so it can be used by other files (like bin/www)
module.exports = app;