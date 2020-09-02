const router = require('express').Router();
const user = require('./../controllers/user');

router.post('/user/new', function(req, res, next) {
    user.handleNew(req,res,next);
});

router.post('/user/rate', function(req, res, next) {
    user.handleRate(req,res,next);
});

router.get('/user/profile', function(req, res, next) {
    user.handleProfile(req,res,next);
});

module.exports = router;
