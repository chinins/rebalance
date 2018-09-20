const url = 'localhost:27017/rebalance-test';
const monk = require('monk');

const db = monk(url);
// eslint-disable-next-line
console.log('Connected to DB');
const Users = db.get('users');

module.exports = Users;
