const mongoose = require('mongoose');

require('./../../src/models/account')(mongoose);
require('./../../src/models/transaction')(mongoose);
require('./../../src/models/grouping')(mongoose);
require('./../../src/models/budget')(mongoose);

require('./../../src/models/user')(mongoose);


require('./../../src/services/mongoose');

const moment = require('moment')

// const ObjectId = mongoose.Schema.Types.ObjectId;

const Account = mongoose.model('Account');
const Transaction = mongoose.model('Transaction');
const Budget = mongoose.model('Budget');
// const User = mongoose.model('User');

const sinon = require('sinon');



// const user = new User({
//     name: 'dfg',
//     email: 'sds@sdf.com',
//     password: 'sdfs'
// })

// const f = async() => {

//     try {

//         const user1 = await user.save();
//     } catch (e) {
//         console.log(e)
//     }
//     user1._id === 1
//     const r = 2 + 2;
//     console.log(user1);
// }
// f()

describe('Budget model', () => {
    // 
    // let j =

    // OBJID.prototype.getTimestamp = function(){
    //     return Date.now()
    // }
    // // OBJID.prototype.toString = function(){
    //     return '0';
    // }

    // OBJID.prototype.valueOf = function(){
    // //     return this.id;
    // // }

    function BudgetMock({
        name,
        defaultAllowance
    }) {
        // this.id = 0;

        // this._id = {
        //     _id: new ObjectId(),
        //     [Symbol.toPrimitive](hint) {
        //         console.log('calledd')
        //         // alert(`hint: ${hint}`);
        //         return this.id;
        //     },
        //     // [Symbol.toStringTag]() {
        //     //     // alert(`hint: ${hint}`);
        //     //     return undefined;
        //     // },
        //     getTimestamp: function () {
        //         return Date.now()
        //     },
        //     defaultValue: function(){
        //         return this.id;
        //     }
        // };



        this._id = {
            getTimestamp: function () {
                return Date.now()
            },
            toString: function () {
                return 0;
            }
        };


        this.budgetPeriods = [];
        this.name = name;

        this.defaultAllowance = defaultAllowance;
    }

    // // const b = new Budget({
    // //     _id: new ObjectId(),
    // //     name: 'sdfs',
    // //     defaultAllowance:100
    // // })
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
        const mockToGo = Object.setPrototypeOf(d, BudgetMock.prototype);

        return mockToGo;
    }


    beforeEach((done) => {

        // sinon.stub(Transaction, 'find').returns(Transaction);
        // sinon.stub(Transaction, 'remove').resolves({});
        done();
    });

    afterEach(done => {
        if (Date.now.restore) Date.now.restore()
        if (Transaction.populate.restore) Transaction.populate.restore()
        // if (Transaction.populate.restore) Transaction.populate.restore();
        if(Transaction.find.restore)Transaction.find.restore();
        // Transaction.remove.restore();
        done();
    });


    it('Should return the given month in budgetPeriods if that is the current month', async() => {
        const defaultAllowance = 100;

        sinon.stub(Date, 'now').returns(1506032784714)
        sinon.stub(Transaction, 'populate').resolves([]);

        const budget = mock({
            name: 'test',
            defaultAllowance
        });

        const {
            budgetPeriods
        } = await budget.assignBudgetPeriod(moment('09-2017', 'MM-YYYY'));

        expect(budgetPeriods.map(bp => moment(bp.month).format('MM-YYYY'))).toEqual(['09-2017'])
    });

    it('Should generate budgetPeriods with month after the given month if month is after the current date', async() => {
        const defaultAllowance = 100;

        const expectedMonths = [
            '04-2017',
            '05-2017',
            '06-2017',
            '07-2017',
            '08-2017',
            '09-2017'
        ]

        sinon.stub(Date, 'now').returns(1491955200000)
        sinon.stub(Transaction, 'populate').resolves([]);

        const budget = mock({
            name: 'test',
            defaultAllowance
        });

        const {
            budgetPeriods
        } = await budget.assignBudgetPeriod(moment('09-2017', 'MM-YYYY'));

        expect(budgetPeriods.map(bp => moment(bp.month).format('MM-YYYY'))).toEqual(expect.arrayContaining(expectedMonths));
    });

    it('Should generate budgetPeriods with month before the given month if month is before the current date', async() => {
        const defaultAllowance = 100;

        const expectedMonths = [
            '02-2018',
            '01-2018',
            '12-2017',
            '11-2017',
            '10-2017',
            '09-2017'
        ]

        sinon.stub(Date, 'now').returns(1518393600000)
        sinon.stub(Transaction, 'populate').resolves([]);

        const budget = mock({
            name: 'test',
            defaultAllowance
        });

        const {
            budgetPeriods
        } = await budget.assignBudgetPeriod(moment('09-2017', 'MM-YYYY'));

        expect(budgetPeriods.map(bp => moment(bp.month).format('MM-YYYY'))).toEqual(expect.arrayContaining(expectedMonths));
    });

    it('Should reject the promise if there is no month provided', async() => {
        const defaultAllowance = 100;

        sinon.stub(Date, 'now').returns(1506032784714)
        sinon.stub(Transaction, 'populate').resolves([]);

        const budget = mock({
            name: 'test',
            defaultAllowance
        });

        try {
            await budget.assignBudgetPeriod();
        } catch (e) {
            expect(e.message).toEqual('Month required!')
        }
    });

    describe('balances', () => {
        beforeEach(async() => {
            // await User.findOne({}).remove()
            // sinon.stub(Transaction, 'find').returns(Transaction);
            // sinon.stub(Transaction, 'remove').resolves({});
            // done();
        })

        afterEach(async() => {
            // await User.findOne({}).remove()
            // if (Date.now.restore) Date.now.restore()
            // if (Transaction.populate.restore) Transaction.populate.restore()
            // if (Transaction.populate.restore) Transaction.populate.restore();
            // Transaction.find.restore();
            // Transaction.remove.restore();
            // done();
        });

        it('should return the defaultAllowance as monthlyBalance if there are no transactions', async() => {

            sinon.stub(Transaction, 'find').resolves([]);

            const budget = mock({
                name: 'test',
                defaultAllowance: 100
            });


            sinon.stub(Date, 'now').returns(1506081561372)
            // console.log(moment().valueOf());
            await budget.assignBudgetPeriod(moment());
            const budgetPeriods = await budget.balances();
            // console.log(budgetPeriods)
            const periods = budgetPeriods['undefined'].monthlyBalance;
            expect(periods).toBe(100)

        });

        it('should return the defaultAllowance minus transaction amount as monthlyBalance if there are transactions in only one period', async() => {

            sinon.stub(Transaction, 'find').resolves([{
                name: '',
                amount: 10,
                date: moment(1506081561372)
            }]);

            const budget = mock({
                name: 'test',
                defaultAllowance: 100
            });


            sinon.stub(Date, 'now').returns(1506081561372)
            // console.log(moment().valueOf());
            await budget.assignBudgetPeriod(moment());
            const budgetPeriods = await budget.balances();
            // console.log(budgetPeriods)
            const periods = budgetPeriods['undefined'].monthlyBalance;
            expect(periods).toBe(90)

        });

        it('should return the defaultAllowance minus transaction amount as monthlyBalance if there are transactions in only one period', async() => {

            sinon.stub(Transaction, 'find').resolves([{
                name: '',
                amount: 10,
                date: moment(1506081561372)
            }, {
                name: '1',
                amount: 10,
                date: moment(1502496000000)
            }]);

            const budget = mock({
                name: 'test',
                defaultAllowance: 100
            });


            sinon.stub(Date, 'now').returns(1506081561372)
            // console.log(moment().valueOf());
            const s = await budget.assignBudgetPeriod(moment());
            console.log(s);
            const a = await s.assignBudgetPeriod(moment(1502496000000));
            console.log(a);
            budget.budgetPeriods[0]._id = 0;
            budget.budgetPeriods[1]._id = 1;
            const budgetPeriods = await budget.balances();
            console.log(budgetPeriods)
            const periods1 = budgetPeriods[1].monthlyBalance;
            const periods0 = budgetPeriods[0].monthlyBalance;
            expect(periods0).toBe(90)
            expect(periods1).toBe(90)

        });

        it('should return the defaultAllowance minus transaction amount as monthlyBalance if there are transactions in only one period', async() => {

            sinon.stub(Transaction, 'find').resolves([{
                name: '',
                amount: 10,
                date: moment(1502496000000)
            }, {
                name: '1',
                amount: 10,
                date: moment(1502496000000)
            }]);

            const budget = mock({
                name: 'test',
                defaultAllowance: 100
            });


            sinon.stub(Date, 'now').returns(1506081561372)
            // console.log(moment().valueOf());
            const s = await budget.assignBudgetPeriod(moment());
            console.log(s);
            const a = await s.assignBudgetPeriod(moment(1502496000000));
            console.log(a);
            budget.budgetPeriods[0]._id = 0;
            budget.budgetPeriods[1]._id = 1;
            const budgetPeriods = await budget.balances();
            console.log(budgetPeriods)
            const periods1 = budgetPeriods[1].monthlyBalance;
            const periods0 = budgetPeriods[0].monthlyBalance;
            const periods1t = budgetPeriods[1].comulativeBalance;
            const periods0t = budgetPeriods[0].comulativeBalance;
            expect(periods0).toBe(100)
            expect(periods1).toBe(80)
            expect(periods0t).toBe(180)
            expect(periods1t).toBe(80)

        });
        it('should invoke transaction.update on removal', async()=>{
            const h =sinon.stub(Transaction, 'update').resolves({});
            // const a =sinon.stub(Transaction, 'find').resolves({budget: undefined});

            // const a = sinon.stub(budget, 'remove').callsFake(() => Transaction.update())
            const budget = mock({
                name: 'test',
                defaultAllowance: 100
            });

            await budget.preRemoveHook();

            expect(h.calledOnce).toBe(true);

            h.restore();
        })
    });
});