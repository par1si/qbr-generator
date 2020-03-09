// app/routes.js
const ClosedDeal = require('../models/closedDeal')
const LostDeal = require('../models/lostDeal');


// Loading in baseline algorithms
const getCloseRateByACV = require('../models/src/algos/baseline/closeRateByACV');
const getCloseRateByDeal = require('../models/src/algos/baseline/closeRateByDeal');
const getCustomerNewSplitByDeal = require('../models/src/algos/baseline/customerNewSplitByDeal');
const getSalesCycleLength = require('../models/src/algos/baseline/salesCycleLength');

// Loading in charting algorithms

const getClosedDealACVArray = require('../models/src/algos/charts/closedDealACVArray');
const getClosedDealNames = require('../models/src/algos/charts/closedDealNames');
const getQuarterlyQuotaArray = require('../models/src/algos/charts/quarterlyQuota');
const getNewBusinessACVTotal = require('../models/src/algos/charts/newBusinessACV');
const getExistingBusinessACVTotal = require('../models/src/algos/charts/existingBusinessACV');

module.exports = function(app, passport) {

    // HOME PAGE (with login links) ========
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // LOGIN ===============================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/qbr', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));



    // SIGNUP ==============================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // PROFILE SECTION =====================

    // this is protected so you have to be logged in to visit
    // use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
       

    // =====================================
    // Routing for QBR page ================
    // =====================================
    app.get('/qbr', isLoggedIn, async function(req, res) {
        // GET route for root
    try {
        const closedDeals = await ClosedDeal.find({ _userId: req.user.id }, null, { sort: { closedOn: 1 } }, function (err, docs) {
            if (err) return console.error(err);
        })
        const lostDeals = await LostDeal.find({ _userId: req.user.id }, null, { sort: { closedOn: -1 } }, function (err, docs) {
            if (err) return console.error(err);
          })
          let closeRateByACV = getCloseRateByACV(closedDeals, lostDeals);
          let closeRateByDeal = getCloseRateByDeal(closedDeals, lostDeals);
          let customerNewSplitByDeal = getCustomerNewSplitByDeal(closedDeals, lostDeals);
          let averageSalesCycleLength = getSalesCycleLength(closedDeals);
          
          let closedDealACVArray = getClosedDealACVArray(closedDeals);
          let closedDealNames = getClosedDealNames(closedDeals);
          let newBusinessACVTotal = getNewBusinessACVTotal(closedDeals);
          let existingBusinessACVTotal = getExistingBusinessACVTotal(closedDeals); 
    
          // Won & Lost deal messages:
          let wonDealMessage = `Your ${closedDeals.length} Won Deal(s) this year:`
          let lostDealMessage = `Your ${lostDeals.length} Lost Deal(s) this year:`
    
          // I need to replace the "262,500" number with a value from the database. Implement user routing first.
          let quarterlyQuotaArray = getQuarterlyQuotaArray((237500 * 4), closedDealACVArray);
          
          res.render('qbr.ejs', {
            closedDeals: closedDeals,
            closedDeal: new ClosedDeal,
            lostDeals: lostDeals,
            lostDeal: new LostDeal,
            wonDealMessage: wonDealMessage,
            lostDealMessage: lostDealMessage,
            closeRateByACV: closeRateByACV,
            closeRateByDeal: closeRateByDeal,
            customerNewSplitByDeal: customerNewSplitByDeal,
            averageSalesCycleLength: averageSalesCycleLength,
            closedDealACVArray: closedDealACVArray,
            closedDealNames: closedDealNames,
            quarterlyQuotaArray: quarterlyQuotaArray,
            newBusinessACVTotal: newBusinessACVTotal,
            existingBusinessACVTotal: existingBusinessACVTotal
            })
    } catch {
        res.send('error')
    }
    })

    app.post('/qbr', isLoggedIn, function(req, res) {
        const closedDeal = new ClosedDeal(req.body)

        // set userId on closedDeal
        closedDeal._userId = req.user.id

        // save and redirect to same page
        closedDeal.save().then(item => {
            res.redirect('/qbr')
        })
        .catch(err => {
            res.status(400).send('Unable to save entry to database.');
        });
    })

    app.post('/qbr/lost', isLoggedIn, function(req, res) {
        const lostDeal = new LostDeal(req.body)

        // set userId on lostDeal
        lostDeal._userId = req.user.id

        // save and redirect to same page
        lostDeal.save().then(item => {
            res.redirect('/qbr')
        })
        .catch(err => {
            res.status(400).send('Unable to save entry to database.');
        });
    })

    // =====================================
    // LOGOUT ==============================
    // =====================================


    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
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
