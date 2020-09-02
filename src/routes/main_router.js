const driverRouter = require('./driver');
const userRouter = require('./user');
const router = require('express').Router();

router.use(userRouter);
router.use(driverRouter);


module.exports = router;