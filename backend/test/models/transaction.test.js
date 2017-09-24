const mongoose = require('mongoose');

require('./../../src/models/account')(mongoose);
require('./../../src/models/transaction')(mongoose);
require('./../../src/models/grouping')(mongoose);
require('./../../src/models/budget')(mongoose);

require('./../../src/models/user')(mongoose);

const {
    ACCOUNT_BALANCE,
    BUDGET_INCOME_CONFLICT,
    DEPENDENCIES_NOT_MET
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
        grouping: '34',
        account: '21312',
        name: name,
        date: Date.now()
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


    const transactionMock = ({
        name,
        type,
        grouping,
        account
    }) => {
        return {
            grouping,
            account,
            name,
            type,
            preRemoveHookOne: Transaction.prototype._pres.$__original_save[2],
            $__getAllSubdocs: function(){
                return [];
            },
            preRemoveHook2: Transaction.prototype._pres.$__original_remove[2]
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
        sinon.stub(Grouping, 'findOne').resolves(
            {}
        )
        sinon.stub(Account, 'find').resolves([account])
        const g = transactionMock({
            name: 'name',
            type: 'income',
            grouping: 'sdfs',
            account: '01201'
        });
        // console.log(g.preRemoveHookOne.toString());
        const nextStub = sinon.spy().bind(g);
        // nextStub()
        try {

            console.log(g.preRemoveHookOne.toString())
            await g.preRemoveHookOne(nextStub);
            
            
        expect(Grouping.findOne.calledOnce).toBe(true)
        expect(nextStub.calledWith(new Error(BUDGET_INCOME_CONFLICT))).toBe(false)
        expect(nextStub.calledOnce).toBe(true)
        } catch (e) {
            // console.log(e)
        }
        // console.log(nextStub)
        Grouping.findOne.restore()
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
        sinon.stub(Grouping, 'findOne').resolves(
            {
                type : "income"
            }
        )
        sinon.stub(Account, 'find').resolves([account])
        const g = transactionMock({
            name: 'name',
            type: 'income',
            grouping: 'sdfs',
            account: '01201'
        });
        // console.log(g.preRemoveHookOne.toString());
        const nextStub = sinon.spy();
        // nextStub()
        try {

            console.log(g.preRemoveHookOne.toString())
            await g.preRemoveHookOne(nextStub);
            
            
        expect(Grouping.findOne.calledOnce).toBe(true)
        expect(nextStub.args[0][0].message).toEqual(BUDGET_INCOME_CONFLICT)
        expect(nextStub.calledOnce).toBe(true)
    } catch (e) {
        console.log(nextStub)
            console.log(e)
        }
        // console.log(nextStub)
        Grouping.findOne.restore()
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
        sinon.stub(Grouping, 'findOne').resolves(
            undefined
        )
        sinon.stub(Account, 'find').resolves([account])
        const g = transactionMock({
            name: 'name',
            type: 'income',
            grouping: 'sdfs',
            account: '01201'
        });
        // console.log(g.preRemoveHookOne.toString());
        const nextStub = sinon.spy();
        // nextStub()
        try {

            console.log(g.preRemoveHookOne.toString())
            await g.preRemoveHookOne(nextStub);
            
            
        expect(Grouping.findOne.calledOnce).toBe(true)
        expect(nextStub.args[0][0].message).toEqual(DEPENDENCIES_NOT_MET)
        expect(nextStub.calledOnce).toBe(true)
    } catch (e) {
        console.log(nextStub)
            console.log(e)
        }
        // console.log(nextStub)
        Grouping.findOne.restore()
    });
    // xit('should invoke transaction.remove()', async() => {
    //     sinon.stub(Transaction, 'remove').resolves({});

    //     const groupingMockInstance = groupingMock({
    //         name: 'name',
    //         type: 'income'
    //     });
    //     await groupingMockInstance.preRemoveHook2();
    //     expect(Transaction.remove.calledOnce).toBe(true)
    //     console.log(groupingMockInstance.preRemoveHook2.toString())
    // })
});