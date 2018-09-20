const monk = require('monk');

const url = 'localhost:27017/rebalance-test';

const db = monk(url)
  // eslint-disable-next-line
  .then(() => console.log('Connected tp DB'));

module.exports = db;
