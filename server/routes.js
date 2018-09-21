const router = require('koa-router')();
const investmentController = require('./controllers/investments.controller');

router.post('/user', investmentController.createUser);
router.get('/portfolio', investmentController.getPortfolio);
router.post('/portfolio1', investmentController.addPortfolio);
router.post('/portfolio', investmentController.addIndexFund);

module.exports = router;
