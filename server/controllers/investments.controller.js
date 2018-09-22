// const _ = require('lodash');
const axios = require('axios');
const Users = require('../db');

const baseUrl = 'https://api.iextrading.com/1.0';

const rebalance = async (user) => {
  const { _id, username, ...filtered } = user;

  let prices = Object.keys(filtered).reduce(async (prices, key) => {
    const price = await axios(`${baseUrl}/stock/${key}/price`);
    prices = await prices;
    return {
      ...prices,
      [key]: price.data,
    };
  }, {});

  prices = await prices;

  const totalSum = Object.keys(filtered).reduce((sum, n) => sum + filtered[n].units * prices[n], 0);

  const filter = Object
    .keys(filtered)
    .reduce((acc, key) => ({
      ...acc,
      [key]: {
        ...filtered[key],
        ticker: key,
        price: prices[key],
        value: Number(prices[key] * filtered[key].units).toFixed(0),
        valueToRebalance: Number((filtered[key].target - filtered[key].units * prices[key] / totalSum) * totalSum).toFixed(0),
        unitsToRebalance: Number(((filtered[key].target - filtered[key].units * prices[key] / totalSum) * totalSum) / prices[key]).toFixed(0),
      },
    }),
    {});
  return Object.assign(user, await filter);
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
    };
    ctx.body = await Users.insert(user);
    ctx.status = 200;
  }
};

module.exports.getPortfolio = async (ctx, next) => {
  const username = ctx.headers['x-user'];
  if (!username) return await next();

  let user = await Users.findOne({ username });
  user = await rebalance(user);

  if (!user) {
    ctx.body = {
      Error: 'No user with this username',
    };
    ctx.status = 401;
  } else {
    ctx.body = user;
    ctx.status = 200;
  }
};

module.exports.addIndexFund = async (ctx, next) => {
  if (ctx.method != 'POST') return await next();

  const username = ctx.headers['x-user'];
  if (!username) return await next();

  const indexFund = ctx.request.body;

  const tickerKey = Object.keys(indexFund)[0];

  ctx.body = await Users.findOneAndUpdate({ username }, {
    $set: {
      [`${tickerKey}`]: indexFund[tickerKey],
    },
  });
  ctx.status = 200;
};

module.exports.rebalancePortfolio = async (ctx, next) => {
  const username = ctx.headers['x-user'];
  if (!username) return await next();

  const user = await Users.findOne({ username });

  if (!user) {
    ctx.body = {
      Error: 'No user with this username',
    };
    ctx.status = 401;
  } else {
    ctx.body = await rebalance(user);
    ctx.status = 200;
  }
};
