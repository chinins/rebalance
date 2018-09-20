const router = require('koa-router')();
const investmentController = require('./controllers/investments.controller');

router.post('/user', investmentController.createUser);
router.post('/portfolio', investmentController.addPortfolio);

module.exports = router;
