const express = require('express');
const router = express.Router();
const ClosedDeal = require('../models/closedDeal');


router.get('/', async (req, res) => {
    try {
        const closedDeals = await ClosedDeal.find({}, null, { limit: 15, sort: { createdOn: -1 } }, function (err, docs) {
            if (err) return console.error(err);
        })
        res.render('index.ejs', {
            closedDeals: closedDeals,
            closedDeal: new ClosedDeal
        })
    } catch {
        res.redirect('/');
    }
});

router.get('/:id', async (req, res) => {
    try {
      let closedDeal = await ClosedDeal.findById(req.params.id)
      res.render('dealPage.ejs', {
        closedDeal: closedDeal
      })
    } catch {
      res.redirect('/')
    }
});

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

router.delete('/:id', async (req, res) => {
    let closedDeal
    try {
      closedDeal = await ClosedDeal.findById(req.params.id)
      await closedDeal.remove()
      res.send('deal removed.')
    } catch {
      if (closedDeal == null) {
        res.send('failed to remove, deal doesnt exist.')
      } else {
        res.send(`something went wrong`)
      }
    }
  })


module.exports = router;