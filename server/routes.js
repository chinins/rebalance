const router = require('koa-router')();
const investmentController = require('./controllers/investments.controller');

router.post('/user', investmentController.createUser);
router.get('/portfolio', investmentController.getPortfolio);
router.get('/rebalance', investmentController.rebalancePortfolio);
router.post('/portfolio', investmentController.addIndexFund);
router.put('/confirm', investmentController.confirmRebalance);

module.exports = router;
