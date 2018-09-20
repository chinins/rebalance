const _ = require('lodash');
const Users = require('../db');

function claculateDeviation(obj, price, totalSum) {
  _.forIn(obj, (value, key, element) => {
    element[key].valueToRebalance = (element[key].target
      - element[key].units * price / totalSum) * totalSum;
    element[key].unitsToRebalance = element[key].valueToRebalance / price;
  });
}

const rebalance = (obj) => {
  const price = 100;
  const totalSum = _.reduce(obj.stocks, (sum, n) => sum + n.units * price, 0)
    + _.reduce(obj.bonds, (sum, n) => sum + n.units * price, 0);
  console.log(totalSum);
  claculateDeviation(obj.stocks, price, totalSum);
  claculateDeviation(obj.bonds, price, totalSum);

  console.log(obj);
};

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

module.exports.getPortfolio = async (ctx, next) => {
  const username = ctx.headers['x-user'];
  if (!username) return await next();

  const user = await Users.findOne({ username });

  if (!user) {
    ctx.body = {
      Error: 'No user with this username'
    };
    ctx.status = 401;
  } else if (!user.stocks && !user.bonds) {
    ctx.body = {
      Error: `No portfolio data for user ${username}.`,
    };
  } else {
    ctx.body = user;
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
  rebalance(userPortfolio);
};
