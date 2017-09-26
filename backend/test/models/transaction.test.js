const moment = require('moment')
const mongoose = require('mongoose');

require('./../../src/models/account')(mongoose);
require('./../../src/models/transaction')(mongoose);
require('./../../src/models/grouping')(mongoose);
require('./../../src/models/budget')(mongoose);
require('./../../src/models/user')(mongoose);

const {
    ACCOUNT_BALANCE,
    BUDGET_INCOME_CONFLICT,
    RESOURCE_NOT_FOUND,
    DEPENDENCIES_NOT_MET
} = require('./../../src/utils/errors');

require('./../../src/services/mongoose');

const Account = mongoose.model('Account');
const Transaction = mongoose.model('Transaction');
const Budget = mongoose.model('Budget');
const Grouping = mongoose.model('Grouping');

const sinon = require('sinon');

describe('Transaction model', () => {

    let transaction;

    const account = {
        _id: 0,
        currentBalance: () => Promise.resolve(2)
    };

    const nextStub = sinon.spy();

    const transactionMock = ({
        name,
        grouping,
        account,
        budget,
        amount
    }) => {
        return {
            amount,
            budget,
            grouping,
            account,
            name,
            date: '',
            $__getAllSubdocs: function () {
                return [];
            },
            firstSaveHook: Transaction.prototype._pres.$__original_save[2],
            secondSaveHook: Transaction.prototype._pres.$__original_save[3],
            thirdSaveHook: Transaction.prototype._pres.$__original_save[4],
            fourthSaveHook: Transaction.prototype._pres.$__original_save[5],
            removeHook: Transaction.prototype._pres.$__original_remove[1]
        }
    }

    beforeEach(done => {
        transaction = transactionMock({
            name: 'name',
            grouping: 'grouping',
            account: 'account',
            amount: 40
        });
        done();
    });

    afterEach(done => {
        nextStub.reset();
        if (Date.now.restore) Date.now.restore()
        if (Transaction.populate.restore) Transaction.populate.restore()
        if (Transaction.find.restore) Transaction.find.restore();
        if (Transaction.aggregate.restore) Transaction.aggregate.restore();
        if (Account.find.restore) Account.find.restore();
        if (Account.findOne.restore) Account.findOne.restore();
        if (Grouping.findOne.restore) Grouping.findOne.restore();
        if (Budget.findOne.restore) Budget.findOne.restore();
        done();
    });


    it('Should forward to next when grouping present and it is not income', async() => {
        sinon.stub(Grouping, 'findOne').resolves({});
        try {
            await transaction.firstSaveHook(nextStub);
            expect(Grouping.findOne.calledOnce).toBe(true);
            expect(nextStub.calledWith(new Error(BUDGET_INCOME_CONFLICT))).toBe(false);
            expect(nextStub.calledOnce).toBe(true);
        } catch (e) {
            fail(e);
        }
    });


    it('Should throw an error if grouping is income and budget present', async() => {
        sinon.stub(Grouping, 'findOne').resolves({
            type: "income"
        });
        transaction.budget = 'budget;'
        try {
            await transaction.firstSaveHook(nextStub);
            expect(Grouping.findOne.calledOnce).toBe(true);
            expect(nextStub.args[0][0].message).toEqual(BUDGET_INCOME_CONFLICT);
            expect(nextStub.calledOnce).toBe(true);
        } catch (e) {
            fail(e);
        }
    });

    it('Should throw an error if there is no grouping', async() => {
        sinon.stub(Grouping, 'findOne').resolves(
            undefined
        );
        try {
            await transaction.firstSaveHook(nextStub);
            expect(Grouping.findOne.calledOnce).toBe(true);
            expect(nextStub.args[0][0].message).toEqual(DEPENDENCIES_NOT_MET);
            expect(nextStub.calledOnce).toBe(true);
        } catch (e) {
            fail(e);
        }
    });

    it('Should throw an error if transaction needs to paired with a budget but it doesnt exist', async() => {
        sinon.stub(Budget, 'findOne').resolves(undefined);
        transaction.budget = 'budget';
        try {
            await transaction.secondSaveHook(nextStub);
            expect(nextStub.args[0][0].message).toEqual(RESOURCE_NOT_FOUND);
            expect(nextStub.calledOnce).toBe(true);
        } catch (e) {
            fail(e);
        }
    });

    it('Should forward when budget doesnt needs to be assigned', async() => {
        sinon.stub(Budget, 'findOne').resolves(undefined);
        sinon.stub(Account, 'find').resolves([account]);

        try {
            await transaction.secondSaveHook(nextStub);
            expect(nextStub.args[0]).toEqual([]);
            expect(nextStub.calledOnce).toBe(true);
        } catch (e) {
            fail(e);
        }
    });

    it('Should forward when budget exists and needs to be assigned', async() => {
        sinon.stub(Budget, 'findOne').resolves({});
        transaction.budget = 'budget';
        try {
            await transaction.secondSaveHook(nextStub);
            expect(nextStub.args[0]).toEqual([]);
            expect(nextStub.calledOnce).toBe(true);
        } catch (e) {
            fail(e);
        }
    });

    it('Should throw error if there is not enough balance on the account', async() => {
        sinon.stub(Grouping, 'findOne').resolves({});
        sinon.stub(Account, 'findOne').resolves(account);
        transaction.budget = 'budget';
        try {
            await transaction.thirdSaveHook(nextStub);
            expect(nextStub.args[0][0].message).toEqual(ACCOUNT_BALANCE);
            expect(nextStub.calledOnce).toBe(true);
        } catch (e) {
            fail(e);
        }
    });

    it('Should forward if account can be found and there is enough balance', async() => {
        sinon.stub(Grouping, 'findOne').resolves({
            type: 'income'
        });
        sinon.stub(Account, 'findOne').resolves(account);
        transaction.budget = 'budget';
        try {
            await transaction.thirdSaveHook(nextStub);
            await expect(nextStub.args[0][0]).toEqual(undefined);
            await expect(nextStub.calledOnce).toBe(true);
        } catch (e) {
            fail(e);
        }
    });

    it('Should throw an error if account cannot be found', async() => {
        sinon.stub(Grouping, 'findOne').resolves({
            type: 'income'
        });
        sinon.stub(Account, 'findOne').resolves(undefined);
        transaction.budget = 'budget';
        try {
            await transaction.thirdSaveHook(nextStub);
            await expect(nextStub.args[0][0]).toEqual(new Error(DEPENDENCIES_NOT_MET));
            await expect(nextStub.calledOnce).toBe(true);
        } catch (e) {
            fail(e);
        }
    });

    it('Should forward if there is a budget', async() => {
        sinon.stub(Budget, 'findOne').resolves({
            assignBudgetPeriod: (d) => Promise.resolve()
        });
        transaction.budget = 'budget';
        try {
            await transaction.fourthSaveHook(nextStub);

            await expect(nextStub.args[0][0]).toEqual(undefined);
            await expect(nextStub.calledOnce).toBe(true);
        } catch (e) {
            fail(e);
        }
    });

    it('Should forward it instantly', async() => {
        sinon.stub(Budget, 'findOne').resolves({
            assignBudgetPeriod: (d) => Promise.resolve()
        });
        try {
            await transaction.fourthSaveHook(nextStub);

            expect(nextStub.args[0][0]).toEqual(undefined);
            expect(nextStub.calledOnce).toBe(true);
            expect(Budget.findOne.calledOnce).toBe(false);
        } catch (e) {
            fail(e);
        }
    });

    it('Should forward instantly if it is expense', async() => {
        sinon.stub(Grouping, 'findOne').resolves({
            type: 'expense'
        });
        sinon.stub(Account, 'findOne').resolves(account);
        try {
            await transaction.removeHook(nextStub);

            expect(nextStub.args[0][0]).toEqual(undefined);
            expect(nextStub.calledOnce).toBe(true);
        } catch (e) {
            fail(e);
        }
    });

    it('Should forward when it is income tand there is enough balance', async() => {
        sinon.stub(Grouping, 'findOne').resolves({
            type: ''
        });
        sinon.stub(Account, 'findOne').resolves(account);
        transaction.amount = 1;
        try {
            await transaction.removeHook(nextStub);
            expect(nextStub.args[0][0]).toEqual(undefined);
            expect(nextStub.calledOnce).toBe(true);
        } catch (e) {
            fail(e);
        }
    });

    it('Should throw an error if transction is income and there is not enough balance', async() => {
        sinon.stub(Grouping, 'findOne').resolves({
            type: ''
        });
        sinon.stub(Account, 'findOne').resolves(account);
        try {
            await transaction.removeHook(nextStub);

            expect(nextStub.args[0][0]).toEqual(new Error(ACCOUNT_BALANCE));
            expect(nextStub.calledOnce).toBe(true);
        } catch (e) {
            fail(e);
        }
    });
});