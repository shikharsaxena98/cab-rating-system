var router = require('express').Router();
const driver = require('./../controllers/driver');
router.post('/driver/new', function(req, res, next) {
	driver.handleNew(req,res,next);
});

router.post('/driver/rate', function(req, res, next) {
    driver.handleRate(req,res,next);
});

router.get('/driver/profile', function(req, res, next) {
    driver.handleProfile(req,res,next);
});

module.exports = router;
