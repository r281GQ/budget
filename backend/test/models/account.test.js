const mongoose = require('mongoose');

require('./../../src/models/account')(mongoose);
require('./../../src/models/transaction')(mongoose);
require('./../../src/models/grouping')(mongoose);

require('./../../src/services/mongoose');

const Account = mongoose.model('Account');
const Transaction = mongoose.model('Transaction');

const sinon = require('sinon');

describe('Account model', () => {

  function AccountMock({
    name,
    initialBalance
  }) {
    this.name = name;
    this.initialBalance = initialBalance;
  }

  AccountMock.prototype.currentBalance = Account.prototype.currentBalance;
  AccountMock.prototype.remove = Account.prototype.remove;
  AccountMock.prototype.preRemoveHook = Account.prototype._pres.$__original_remove[1];

  beforeEach((done) => {
    sinon.stub(Transaction, 'find').returns(Transaction);
    sinon.stub(Transaction, 'remove').resolves({});
    done();
  })

  afterEach(done => {
    if (Transaction.populate.restore) Transaction.populate.restore();
    Transaction.find.restore();
    Transaction.remove.restore();
    done();
  })


  it('Should return initial balance with no transactions persisted yet', () => {
    const initialBalance = 100;

    sinon.stub(Transaction, 'populate').resolves([]);

    const accountToCreate = new AccountMock({
      name: 'test',
      initialBalance
    });

    return expect(accountToCreate.currentBalance()).resolves.toBe(initialBalance)
  });

  it('Should return initial balance plus transaction if it is an income', () => {
    const initialBalance = 100;

    sinon.stub(Transaction, 'populate').resolves([{
      grouping: {
        type: 'income'
      },
      amount: 10
    }]);

    const accountToCreate = new AccountMock({
      name: 'test',
      initialBalance
    });

    return expect(accountToCreate.currentBalance()).resolves.toBe(110)
  });

  it('Should return initial balance minus transaction if it is an expense', () => {
    const initialBalance = 100;

    sinon.stub(Transaction, 'populate').resolves([{
      grouping: {
        type: 'expense'
      },
      amount: 10
    }]);

    const accountToCreate = new AccountMock({
      name: 'test',
      initialBalance
    });

    return expect(accountToCreate.currentBalance()).resolves.toBe(90)
  });

  it('Should invoke transaction remove if account is removed in pre hook.', async() => {
    const initialBalance = 100;

    const accountToCreate = new AccountMock({
      name: 'test',
      initialBalance
    });

    const nextMock = sinon.spy();

    await accountToCreate.preRemoveHook(nextMock);

    expect(Transaction.remove.calledOnce).toBe(true);
    expect(nextMock.calledOnce).toBe(true);
  });
});