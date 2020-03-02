const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    let hashedPassword = req.query.valid
    
    res.render('sample.ejs')
})

module.exports = router;