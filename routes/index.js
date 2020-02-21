const express = require('express');
const router = express.Router();
const ClosedDeal = require('../models/closedDeal');
const LostDeal = require('../models/lostDeal');

const getCloseRateByACV = require('../models/src/algos/baseline/closeRateByACV');
const getCloseRateByDeal = require('../models/src/algos/baseline/closeRateByDeal');
const getCustomerNewSplitByDeal = require('../models/src/algos/baseline/customerNewSplitByDeal');



// GET route
router.get('/', async (req, res) => {
  try {
      const closedDeals = await ClosedDeal.find({}, null, { limit: 15, sort: { createdOn: -1 } }, function (err, docs) {
          if (err) return console.error(err);
      })
      const lostDeals = await LostDeal.find({}, null, { limit: 15, sort: { createdOn: -1 } }, function (err, docs) {
        if (err) return console.error(err);
      })
      let closeRateByACV = getCloseRateByACV(closedDeals, lostDeals);
      let closeRateByDeal = getCloseRateByDeal(closedDeals, lostDeals);
      let customerNewSplitByDeal = getCustomerNewSplitByDeal(closedDeals, lostDeals);
      let averageSalesCycleLength = `Work in progress.`
      res.render('index.ejs', {
          closedDeals: closedDeals,
          closedDeal: new ClosedDeal,
          lostDeals: lostDeals,
          lostDeal: new LostDeal,
          closeRateByACV: closeRateByACV,
          closeRateByDeal: closeRateByDeal,
          customerNewSplitByDeal: customerNewSplitByDeal,
          averageSalesCycleLength: averageSalesCycleLength
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
    if (closedDeal == null) {
      res.redirect('/')
    } else {
      res.send('Error updating deal.')
      }
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
    if (lostDeal == null) {
      res.redirect('/')
    } else {
      res.send('Error updating deal.')
      }
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