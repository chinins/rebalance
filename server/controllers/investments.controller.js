const Users = require('../db');

module.exports.createUser = async (ctx, next) => {
  if (ctx.method != 'POST') return await next();
  const userData = ctx.request.body;

  let user = await Users.findOne({ username: userData.username });

  if (user) {
    ctx.status = 400;
    ctx.body = {
      error: 'Username already exists',
    };
  } else {
    user = {
      username: userData.username,
      stocks: 0,
      bonds: 0,
    };
    ctx.body = await Users.insert(user);
    ctx.status = 200;
  }
};

module.exports.addPortfolio = async (ctx, next) => {
  if (ctx.method != 'POST') return await next();

  const userPortfolio = ctx.request.body;

  ctx.body = await Users.findOneAndUpdate({ username: userPortfolio.username }, {
    $set: {
      stocks: userPortfolio.stocks,
      bonds: userPortfolio.bonds,
    },
  });
  ctx.status = 200;
};

const rebalance = () => {

};
