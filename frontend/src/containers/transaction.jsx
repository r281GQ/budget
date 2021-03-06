import React from 'react';
import PropTypes from 'prop-types';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form/immutable';
import { Map } from 'immutable';


import { createTransaction, updateTransaction } from './../store/action_creators/transaction';
import { getAccounts } from './../store/action_creators/account';
import { getGroupings } from './../store/action_creators/grouping';
import { getBudgets } from './../store/action_creators/budget';
import Message from './message';
import Transaction from './../components/transaction/transaction';

class TransactionContainer extends React.PureComponent {
  componentDidMount() {
    if (this.props.match.params.id !== '0') {
      this.props.initialize(
        this.props.transactions
          .find((value, key) => key === this.props.match.params.id)
          .withMutations(map =>
            map
              .update('account', value => value.get('_id'))
              .update('grouping', value => value.get('_id'))
              .update('budget', value => (value ? value.get('_id') : 0))
              .update('equity', value => (value ? value.get('_id') : 0))
          )
      );
    } else {
      this.props.initialize(
        Map().withMutations(map =>
          map
            .set('currency', 'GBP')
            .set('amount', 0)
            .set('account', this.props.accounts.first().get('_id'))
            .set('grouping', this.props.groupings.first().get('_id'))
            .set('equity', 0)
            .set('budget', 0)
        )
      );
    }
  }

  constructor(props) {
    super(props);
    this._handleUpdateTransactions = this._handleUpdateTransactions.bind(this);
    this._handleCreateTransactions = this._handleCreateTransactions.bind(this);
  }

  _handleCreateTransactions(formProps) {
    if (
      formProps.get('budget') !== 0 &&
      this.props.groupings
        .find((value, key) => key === formProps.get('grouping'))
        .get('type') === 'income'
    ) {
      throw new SubmissionError({
        _error: `You can't create transacton with budget and income!`
      });
    }
    this.props.createTransaction({
      ...formProps.toJS(),
      budget:
      formProps.get('budget') === 0 ? undefined : formProps.get('budget')
    });
  }

  _handleUpdateTransactions(formProps) {
    if (
      formProps.get('budget') !== 0 &&
      this.props.groupings
        .find((value, key) => key === formProps.get('grouping'))
        .get('type') === 'income'
    ) {
      throw new SubmissionError({
        _error: `You can't create transacton with budget and income!`
      });
    }
    this.props.updateTransaction({
      _id: this.props.match.params.id,
      ...formProps.toJS(),
      budget:
      formProps.get('budget') === 0 ? undefined : formProps.get('budget')
    });
  }

  render() {
    return (
      <Transaction
        {...this.props}
        RenderMessage={Message}
        accounts={this.props.accounts.toList().toJS()}
        groupings={this.props.groupings.toList().toJS()}
        budgets={this.props.budgets.toList().toJS()}
        handleFormSubmit={this.props.handleSubmit(
          this.props.match.params.id === '0'
            ? this._handleCreateTransactions
            : this._handleUpdateTransactions
        )}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    accounts: state.getIn(['account', 'data']),
    groupings: state.getIn(['grouping', 'data']),
    budgets: state.getIn(['budget', 'data']),
    transactions: state.getIn(['transaction', 'data'])
  };
};

TransactionContainer.propTypes = {
  transactions: PropTypes.any,
  accounts: PropTypes.any,
  groupings: PropTypes.any,
  budgets: PropTypes.any,
  getAccounts: PropTypes.func.isRequired,
  getGroupings: PropTypes.func.isRequired,
  getBudgets: PropTypes.func.isRequired,
  createTransaction: PropTypes.func.isRequired,
  updateTransaction: PropTypes.func.isRequired
};

export default (
  connect(mapStateToProps, {
    createTransaction,
    updateTransaction,
    getAccounts,
    getGroupings,
    getBudgets
  })(reduxForm({ form: 'transaction' })(TransactionContainer))
);
