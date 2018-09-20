const router = require('koa-router')();
const investmentController = require('./controllers/investments.controller');

router.post('/user', investmentController.createUser);
router.get('/portfolio', investmentController.getPortfolio);
router.post('/portfolio', investmentController.addPortfolio);

module.exports = router;
