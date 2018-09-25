const router = require('koa-router')();
const investmentController = require('./controllers/investments.controller');

router.post('/user', investmentController.createUser);
router.post('/portfolio', investmentController.addIndexFund);
router.get('/portfolio', investmentController.getPortfolio);
router.get('/rebalance', investmentController.rebalancePortfolio);
router.post('/extra', investmentController.addExtra);
router.get('/confirm', investmentController.confirmRebalance);

module.exports = router;
