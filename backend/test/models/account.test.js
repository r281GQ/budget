const mongoose = require('mongoose');

require('./../../src/models/user')(mongoose);
require('./../../src/models/account')(mongoose);
require('./../../src/models/transaction')(mongoose);
require('./../../src/models/grouping')(mongoose);

require('./../../src/services/mongoose');

const Account = mongoose.model('Account');
const User = mongoose.model('User');
const Transaction = mongoose.model('Transaction');
const Grouping = mongoose.model('Grouping');

describe('Account model', () => {
  let user;
  let grouping;

  beforeAll(done => {
    const userToSave = new User({
      userName: 'Endre',
      email: 'veghendre@gmai.com',
      password: '23423423'
    });

    userToSave
      .save()
      .then(savedUser => {
        user = savedUser;
        return 0;
      })
      .then(() => done())
      .catch(error => {
        console.log(error);
        done(error);
      });
  });

  afterAll(done => {
    User.findOneAndRemove({ _id: user._id }).then(user => done());
  });

  describe('CurrentBalance', () => {
    beforeEach(done => {
      const groupingToSave = new Grouping({
        name: 'Income',
        type: 'income'
      });
      groupingToSave.user = user;
      return groupingToSave.save().then(() => done());
    });

    it('Should return initial balance with no transactions persisted yet', done => {
      const initialBalance = 100;

      const accountToCreate = new Account({
        name: 'test',
        initialBalance
      });

      accountToCreate.user = user;

      accountToCreate
        .save()
        .then(account => account.currentBalance())
        .then(currentBalance => {
          expect(currentBalance).toBe(initialBalance);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('Should return initial balance with no transactions persisted yet', done => {
      const initialBalance = 100;

      const accountToCreate = new Account({
        name: 'test',
        initialBalance
      });

      accountToCreate.user = user;

      accountToCreate
        .save()
        .then(account => account.currentBalance())
        .then(currentBalance => {
          expect(currentBalance).toBe(initialBalance);
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });
});
