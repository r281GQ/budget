const mongoose = require('mongoose');

require('./../../src/models/account')(mongoose);
require('./../../src/models/transaction')(mongoose);
require('./../../src/models/grouping')(mongoose);
require('./../../src/models/budget')(mongoose);

require('./../../src/models/user')(mongoose);

const {
    ACCOUNT_BALANCE
} = require('./../../src/utils/errors');
require('./../../src/services/mongoose');

const moment = require('moment')

// const ObjectId = mongoose.Schema.Types.ObjectId;

const Account = mongoose.model('Account');
const Transaction = mongoose.model('Transaction');
const Budget = mongoose.model('Budget');
const Grouping = mongoose.model('Grouping');

const sinon = require('sinon');



const mock = ({
    name,
    defaultAllowance
}) => {
    const d = {
        _id: 0,
        budgetPeriods: [],
        name: name,
        defaultAllowance: defaultAllowance,
        createdAt: Date.now()
    };

    BudgetMock.prototype.assignBudgetPeriod = Budget.prototype.assignBudgetPeriod;
    BudgetMock.prototype.balances = Budget.prototype.balances;

    BudgetMock.prototype.save = function () {
        return Promise.resolve(this)
    }
    BudgetMock.prototype.remove = Budget.prototype.remove;
    // BudgetMock.prototype.applyHooks = Budget.prototype.applyHooks;
    BudgetMock.prototype.preRemoveHook = Budget.prototype._pres.$__original_remove[1];

    BudgetMock.prototype.preRemoveHook2 = Budget.prototype._pres.$__original_remove[2];
    const mockToGo = Object.setPrototypeOf(d, BudgetMock.prototype);

    return mockToGo;
}
// f() 
describe('Grouping model', () => {


    const groupingMock = ({
        name,
        type
    }) => {
        return {
            name,
            type,
            preRemoveHookOne: Grouping.prototype._pres.$__original_remove[1],
            preRemoveHook2: Grouping.prototype._pres.$__original_remove[2]
        }
    }

    beforeEach((done) => {

        // sinon.stub(Transaction, 'find').returns(Transaction);
        // sinon.stub(Transaction, 'remove').resolves({});
        done();
    });

    afterEach(done => {
        if (Date.now.restore) Date.now.restore()
        if (Transaction.populate.restore) Transaction.populate.restore()
        if (Transaction.find.restore) Transaction.find.restore();
        if (Transaction.aggregate.restore) Transaction.aggregate.restore();
        if (Account.find.restore) Account.find.restore()
        done();
    });


    it('Should return the given month in budgetPeriods if that is the current month', async() => {
        const transaction = {
            account: {
                _id: {
                    id: 0,
                    equals: accountID => accountID === id
                }
            },
            grouping: {
                type: 'income'
            },
            amount: 10
        }

        const account = {
            _id: 0
        }
        sinon.stub(Transaction, 'aggregate').resolves([{
            _id: {
                account: 0,
                initialBalance: 20
            },
            sumExpense: 20,
            sumIncome: 100
        }])
        sinon.stub(Account, 'find').resolves([account])
        const g = groupingMock({
            name: 'name',
            type: 'income'
        });
        // console.log(g.preRemoveHookOne.toString());
        const nextStub = sinon.spy();
        // nextStub()
        try {

            await g.preRemoveHookOne(nextStub);
        } catch (e) {
            // console.log(e)
        }
        expect(Transaction.aggregate.calledOnce).toBe(true)
        expect(nextStub.calledOnce).toBe(true)
        // console.log(nextStub)
        // Transaction.aggregate.restore()
    });

    it('Should return false when initialBalance + sumIncome - sumExpense < 0', async() => {
        sinon.stub(Transaction, 'aggregate').resolves([{
            _id: {
                account: 0,
                initialBalance: 20
            },
            sumExpense: 200,
            sumIncome: 100
        }])

        const groupingMockInstance = groupingMock({
            name: 'name',
            type: 'income'
        });

        const nextStub = sinon.spy();

        try {
            await groupingMockInstance.preRemoveHookOne(nextStub);
            expect(nextStub.calledWith(new Error(ACCOUNT_BALANCE))).toEqual(true)
            expect(Transaction.aggregate.calledOnce).toBe(true)
        } catch (e) {}
    });
    
    it('should invoke transaction.remove()', async() => {
        sinon.stub(Transaction, 'remove').resolves({});

        const groupingMockInstance = groupingMock({
            name: 'name',
            type: 'income'
        });
        await groupingMockInstance.preRemoveHook2();
        expect(Transaction.remove.calledOnce).toBe(true)
    })
});