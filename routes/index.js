const express = require('express');
const router = express.Router();
const ClosedDeal = require('../models/schemas/closedDeal');
const LostDeal = require('../models/schemas/lostDeal');


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

const numberWithCommas = require('../public/js/numberWithCommas');

// Defining current quarter
const today = new Date();
function getLastQuarter (today) {
  let quarter = Math.floor((today.getMonth() + 1) / 3);
  if (quarter < 1) {
    return 4
  } else if (quarter > 4) {
    return 1
  } else {
    return quarter
  }
}

let lastQuarter = `Q` + getLastQuarter(today);


// GET route for root
router.get('/', async (req, res) => {
  try {
      
      const closedDeals = await ClosedDeal.find({}, null, { sort: { closedOn: 1 } }, function (err, docs) {
          if (err) return console.error(err);
      })
      const lostDeals = await LostDeal.find({}, null, { sort: { closedOn: -1 } }, function (err, docs) {
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
      
      res.render('index.ejs', {
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
          numberWithCommas: numberWithCommas,
          closedDealACVArray: closedDealACVArray,
          closedDealNames: closedDealNames,
          quarterlyQuotaArray: quarterlyQuotaArray,
          newBusinessACVTotal: newBusinessACVTotal,
          existingBusinessACVTotal: existingBusinessACVTotal
      })
  } catch {
      res.send('Something went wrong');
  }
});

// GET route for :id parameter
router.get('/:id', async (req, res) => {
  try {
    const closedDeal = await ClosedDeal.findById(req.params.id)
    res.render('dealPage.ejs', {
      closedDeal: closedDeal
    })
  } catch {
    res.redirect('/')
  }
});

// Sample GET route for :quarter parameter

router.get('/quarter/:quarter', async (req, res) => {
  try {
    const closedDeals = await ClosedDeal.find({fiscalQuarterClosed : `Q${req.params.quarter}`}, null, { sort: { closedOn: 1 } }, function (err, docs){
      if (err) return console.error(err);
      })
      const lostDeals = await LostDeal.find({fiscalQuarterClosed : `Q${req.params.quarter}`}, null, { sort: { closedOn: -1 } }, function (err, docs) {
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

      // Won & Lost Deal Messages
      let wonDealMessage = `Your ${closedDeals.length} Won Deal(s) this quarter:`
      let lostDealMessage = `Your ${lostDeals.length} Lost Deal(s) this quarter:`

      // I need to replace the "262,500" number with a value from the database. Implement user routing first.
      let quarterlyQuotaArray = getQuarterlyQuotaArray(237500, closedDealACVArray);
      
      res.render('index.ejs', {
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
          numberWithCommas: numberWithCommas,
          closedDealACVArray: closedDealACVArray,
          closedDealNames: closedDealNames,
          quarterlyQuotaArray: quarterlyQuotaArray,
          newBusinessACVTotal: newBusinessACVTotal,
          existingBusinessACVTotal: existingBusinessACVTotal
      })
  } catch {
      res.send('Something went wrong');
  }
});

// GET route for :id parameter
router.get('/lost/:id', async (req, res) => {
  try {
    const lostDeal = await LostDeal.findById(req.params.id)
    res.render('lostDealPage.ejs', {
      lostDeal: lostDeal
    })
  } catch {
    res.redirect('/')
  }
});

// POST route
router.post('/', (req, res) => {
  const closedDeal = new ClosedDeal(req.body);
  closedDeal.save()
      .then(item => {
          res.redirect('/')
      })
      .catch(err => {
          res.status(400).send('Unable to save entry to database.');
      });
});

// POST route for Lost Deals
router.post('/lost', (req, res) => {
  const lostDeal = new LostDeal(req.body);
  lostDeal.save()
      .then(item => {
          res.redirect('/')
      })
      .catch(err => {
          res.status(400).send('Unable to save entry to database.');
          console.log(err)
      });
});

// PUT route for :id parameter
router.put('/:id', async (req, res) => {
  let closedDeal
  try {
    closedDeal = await ClosedDeal.findById(req.params.id)
      closedDeal.companyName = req.body.companyName
      closedDeal.fiscalQuarterClosed = req.body.fiscalQuarterClosed
      closedDeal.industry = req.body.industry
      closedDeal.dealType = req.body.dealType
      closedDeal.termLength = req.body.termLength
      closedDeal.ACV = req.body.ACV
      closedDeal.multiYearRevenue = req.body.multiYearRevenue
      closedDeal.servicesHours = req.body.servicesHours
      closedDeal.closedOn = req.body.closedOn
      closedDeal.dateFirstEngaged = req.body.dateFirstEngaged
      closedDeal.mainCompetitor = req.body.mainCompetitor
    await closedDeal.save()
    res.redirect(`/${closedDeal.id}`)
  } catch {
    res.send('Error updating deal.')
  }
});

// PUT route for /lost/:id parameter
router.put('/lost/:id', async (req, res) => {
  let lostDeal
  try {
    lostDeal = await LostDeal.findById(req.params.id)
      lostDeal.companyName = req.body.companyName
      lostDeal.industry = req.body.industry
      lostDeal.dealType = req.body.dealType
      lostDeal.ACV = req.body.ACV
      lostDeal.dateFirstEngaged = req.body.dateFirstEngaged
      lostDeal.mainCompetitor = req.body.mainCompetitor
    await lostDeal.save()
    res.redirect(`/${lostDeal.id}`)
  } catch {
    res.send('Error updating deal.')
  }
});

// DELETE route
router.delete('/:id', async (req, res) => {
  let closedDeal
  try {
    closedDeal = await ClosedDeal.findById(req.params.id)
    await closedDeal.remove()
    res.redirect('/')
  } catch {
    if (closedDeal == null) {
      res.redirect('/')
      console.log('Deal does not exist.')
    } else {
      res.send(`Something went wrong.`)
    }
  }
});

// DELETE lost deal route
router.delete('/lost/:id', async (req, res) => {
  let lostDeal
  try {
    lostDeal = await LostDeal.findById(req.params.id)
    await lostDeal.remove()
    res.redirect('/')
  } catch {
    if (lostDeal == null) {
      res.redirect('/')
      console.log('Deal does not exist.')
    } else {
      res.send(`Something went wrong.`)
    }
  }
});



module.exports = router;