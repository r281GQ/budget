import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { Map } from 'immutable';

import Transactions from './../components/transactions/transactions';
import Message from './message';
import { getTransactions } from './../store/action_creators/transaction';

class TransactionsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  componentDidMount() {
    this.props.initialize(
      Map().withMutations(map =>
        map
          .set('account', 0)
          .set('budget', 0)
          .set('grouping', 0)
          .set('date', 0)
          .set('last', 0)
      )
    );
  }

  _handleFormSubmit(formProps) {
    const queryParams = {};

    if (formProps.get('name')) queryParams.name = formProps.get('name')
    if (formProps.get('account') !== 0) queryParams.account = formProps.get('account')
    if (formProps.get('grouping') !== 0) queryParams.grouping = formProps.get('grouping')
    if (formProps.get('date') !== 0) queryParams.date = formProps.get('date')
    if (formProps.get('budget') !== 0) queryParams.budget = formProps.get('budget')
    if (formProps.get('last') !== 0) queryParams.last = formProps.get('last')

    this.props.getTransactions(queryParams);
  }

  componentWillUnmount() { }

  render() {
    return (
      <Transactions
        {...this.props}
        RenderMessage={Message}
        accounts={this.props.accounts.toList().toJS()}
        groupings={this.props.groupings.toList().toJS()}
        budgets={this.props.budgets.toList().toJS()}
        handleFormSubmit={this.props.handleSubmit(this._handleFormSubmit)}
      />
    );
  }
}

TransactionsContainer.propTypes = {
  accounts: ImmutablePropTypes.mapContains({
    _id: PropTypes.string,
    name: PropTypes.string,
    initialBalance: PropTypes.number,
    currency: PropTypes.string
  }),
  groupings: ImmutablePropTypes.mapContains({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.oneOf(['income', 'expense'])
  }),
  budgets: ImmutablePropTypes.mapContains({
    _id: PropTypes.string,
    name: PropTypes.string,
    defaultAllowance: PropTypes.number,
    budgetPeriods: ImmutablePropTypes.mapContains({
      _id: PropTypes.string,
      allowance: PropTypes.number,
      monthlyBalance: PropTypes.number,
      comulativeBalance: PropTypes.number,
      month: PropTypes.string
    })
  }),
  getTransactions: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    accounts: state.getIn(['account', 'data']),
    budgets: state.getIn(['budget', 'data']),
    equities: state.getIn(['equity', 'data']),
    groupings: state.getIn(['grouping', 'data'])
  };
};

export default connect(mapStateToProps, { getTransactions })(
  reduxForm({ form: 'filter' })(TransactionsContainer)
);
