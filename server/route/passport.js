module.exports = function(app, passport) {

    // LOGIN 
    app.get('/thiant/login', function(req, res) {

    });

    // SIGNUP 
    app.get('/thiant/signup', function(req, res) {

    });

    // process the signup form
    app.post('/thiant/signup', passport.authenticate('local-signup', {
        failureFlash : true // allow flash messages
    }));

        // process the login form
    app.post('/login', passport.authenticate('local-login', {
        failureFlash : true // allow flash messages
    }));

    // LOGOUT 
    app.get('/thiant/logout', function(req, res) {
        req.logout();
        res.redirect('/thiant');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');    
}


//pour proteger les requetes entrantes
/*
 app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

*/