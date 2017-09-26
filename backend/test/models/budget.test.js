const mongoose = require('mongoose');

require('./../../src/models/account')(mongoose);
require('./../../src/models/transaction')(mongoose);
require('./../../src/models/grouping')(mongoose);
require('./../../src/models/budget')(mongoose);

require('./../../src/models/user')(mongoose);

require('./../../src/services/mongoose');

const moment = require('moment');

const Account = mongoose.model('Account');
const Transaction = mongoose.model('Transaction');
const Budget = mongoose.model('Budget');

const sinon = require('sinon');

describe('Budget model', () => {
  function BudgetMock({ name, defaultAllowance }) {
    this._id = {
      getTimestamp: function() {
        return Date.now();
      },
      toString: function() {
        return 0;
      }
    };

    this.budgetPeriods = [];
    this.name = name;

    this.defaultAllowance = defaultAllowance;
  }

  const mock = ({ name, defaultAllowance }) => {
    return {
      _id: 0,
      budgetPeriods: [],
      name: name,
      defaultAllowance: defaultAllowance,
      createdAt: Date.now(),
      save: function() {
        return Promise.resolve(this);
      },
      assignBudgetPeriod: Budget.prototype.assignBudgetPeriod,
      balances: Budget.prototype.balances,
      remove: Budget.prototype.remove,
      preRemoveHook: Budget.prototype._pres.$__original_remove[1]
    };
  };

  beforeEach(done => {
    done();
  });

  afterEach(done => {
    if (Date.now.restore) Date.now.restore();
    if (Transaction.populate.restore) Transaction.populate.restore();
    if (Transaction.find.restore) Transaction.find.restore();
    done();
  });

  it('Should return the given month in budgetPeriods if that is the current month', async () => {
    const defaultAllowance = 100;

    sinon.stub(Date, 'now').returns(1506032784714);
    sinon.stub(Transaction, 'populate').resolves([]);

    const budget = mock({
      name: 'test',
      defaultAllowance
    });

    const { budgetPeriods } = await budget.assignBudgetPeriod(
      moment('09-2017', 'MM-YYYY')
    );

    expect(
      budgetPeriods.map(bp => moment(bp.month).format('MM-YYYY'))
    ).toEqual(['09-2017']);
  });

  it('Should generate budgetPeriods with month after the given month if month is after the current date', async () => {
    const defaultAllowance = 100;

    const expectedMonths = [
      '04-2017',
      '05-2017',
      '06-2017',
      '07-2017',
      '08-2017',
      '09-2017'
    ];

    sinon.stub(Date, 'now').returns(1491955200000);
    sinon.stub(Transaction, 'populate').resolves([]);

    const budget = mock({
      name: 'test',
      defaultAllowance
    });

    const { budgetPeriods } = await budget.assignBudgetPeriod(
      moment('09-2017', 'MM-YYYY')
    );

    expect(budgetPeriods.map(bp => moment(bp.month).format('MM-YYYY'))).toEqual(
      expect.arrayContaining(expectedMonths)
    );
  });

  it('Should generate budgetPeriods with month before the given month if month is before the current date', async () => {
    const defaultAllowance = 100;

    const expectedMonths = [
      '02-2018',
      '01-2018',
      '12-2017',
      '11-2017',
      '10-2017',
      '09-2017'
    ];

    sinon.stub(Date, 'now').returns(1518393600000);
    sinon.stub(Transaction, 'populate').resolves([]);

    const budget = mock({
      name: 'test',
      defaultAllowance
    });

    const { budgetPeriods } = await budget.assignBudgetPeriod(
      moment('09-2017', 'MM-YYYY')
    );

    expect(budgetPeriods.map(bp => moment(bp.month).format('MM-YYYY'))).toEqual(
      expect.arrayContaining(expectedMonths)
    );
  });

  it('Should reject the promise if there is no month provided', async () => {
    const defaultAllowance = 100;

    sinon.stub(Date, 'now').returns(1506032784714);
    sinon.stub(Transaction, 'populate').resolves([]);

    const budget = mock({
      name: 'test',
      defaultAllowance
    });

    try {
      await budget.assignBudgetPeriod();
    } catch (e) {
      expect(e.message).toEqual('Month required!');
    }
  });

  describe('balances', () => {
    it('should return the defaultAllowance as monthlyBalance if there are no transactions', async () => {
      sinon.stub(Transaction, 'find').resolves([]);

      const budget = mock({
        name: 'test',
        defaultAllowance: 100
      });

      sinon.stub(Date, 'now').returns(1506081561372);
      await budget.assignBudgetPeriod(moment());
      const budgetPeriods = await budget.balances();
      const periods = budgetPeriods['undefined'].monthlyBalance;
      expect(periods).toBe(100);
    });

    it('should return the defaultAllowance minus transaction amount as monthlyBalance if there are transactions in only one period', async () => {
      sinon.stub(Transaction, 'find').resolves([
        {
          name: '',
          amount: 10,
          date: moment(1506081561372)
        }
      ]);

      const budget = mock({
        name: 'test',
        defaultAllowance: 100
      });

      sinon.stub(Date, 'now').returns(1506081561372);
      await budget.assignBudgetPeriod(moment());
      const budgetPeriods = await budget.balances();
      const periods = budgetPeriods['undefined'].monthlyBalance;
      expect(periods).toBe(90);
    });

    it('should return the defaultAllowance minus transactions amount as monthlyBalance if there are multiple transactions in only one period', async () => {
      sinon.stub(Transaction, 'find').resolves([
        {
          name: '',
          amount: 10,
          date: moment(1506081561372)
        },
        {
          name: '1',
          amount: 10,
          date: moment(1502496000000)
        }
      ]);

      const budget = mock({
        name: 'test',
        defaultAllowance: 100
      });

      sinon.stub(Date, 'now').returns(1506081561372);
      await budget.assignBudgetPeriod(moment());
      await budget.assignBudgetPeriod(moment(1502496000000));
      budget.budgetPeriods[0]._id = 0;
      budget.budgetPeriods[1]._id = 1;
      const budgetPeriods = await budget.balances();
      const periods1 = budgetPeriods[1].monthlyBalance;
      const periods0 = budgetPeriods[0].monthlyBalance;
      expect(periods0).toBe(90);
      expect(periods1).toBe(90);
    });

    it('should return the defaultAllowance minus transaction amount as comulativeBalance if there are transactions in only one period', async () => {
      sinon.stub(Transaction, 'find').resolves([
        {
          name: '',
          amount: 10,
          date: moment(1502496000000)
        },
        {
          name: '1',
          amount: 10,
          date: moment(1502496000000)
        }
      ]);

      const budget = mock({
        name: 'test',
        defaultAllowance: 100
      });

      sinon.stub(Date, 'now').returns(1506081561372);
      budget.assignBudgetPeriod(moment());
      budget.assignBudgetPeriod(moment(1502496000000));
      budget.budgetPeriods[0]._id = 0;
      budget.budgetPeriods[1]._id = 1;
      const budgetPeriods = await budget.balances();
      const periods1 = budgetPeriods[1].monthlyBalance;
      const periods0 = budgetPeriods[0].monthlyBalance;
      const periods1t = budgetPeriods[1].comulativeBalance;
      const periods0t = budgetPeriods[0].comulativeBalance;
      expect(periods0).toBe(100);
      expect(periods1).toBe(80);
      expect(periods0t).toBe(180);
      expect(periods1t).toBe(80);
    });
    it('should invoke transaction.update on removal', async () => {
      sinon.stub(Transaction, 'update').resolves({});
      const budget = mock({
        name: 'test',
        defaultAllowance: 100
      });

      await budget.preRemoveHook();

      expect(Transaction.update.calledOnce).toBe(true);
      Transaction.update.restore();
    });
  });
});
