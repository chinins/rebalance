const logger = require('koa-logger');
const Koa = require('koa');
const cors = require('kcors');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = require('./routes.js');

app
  .use(logger())
  .use(cors())
  .use(bodyParser())
  .use(router.routes());

const port = process.env.PORT || 3000;
// eslint-disable-next-line
app.listen(port, () => console.log(`Server listening on port ${port}`));
