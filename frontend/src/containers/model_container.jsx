import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import Message from './message';
import Accounts from './../components/accounts/accounts';
import Groupings from './../components/groupings/groupings';
import Budgets from './../components/budgets/budgets';
import Transactions from './transactions';

import withAuth from './with_auth';
import { deleteTransaction, getTransactions } from './../store/action_creators/transaction';
import { deleteGrouping, getGroupings } from './../store/action_creators/grouping';
import { deleteAccount, getAccounts } from './../store/action_creators/account';
import { deleteBudget, getBudgets } from './../store/action_creators/budget';

const handlers = {
  account: deleteAccount,
  grouping: deleteGrouping,
  transaction: deleteTransaction,
  budget: deleteBudget
};

const fetchers = {
  account: getAccounts,
  grouping: getGroupings,
  transaction: getTransactions,
  budget: getBudgets
};

/*eslint react/display-name: off*/
/*eslint react/prop-types: off*/
const withUI = type => props => {
  switch (type) {
    case 'account':
      return (
        <Accounts
          {...props}
          accountDeleteHandler={props._handleDelete}
          accounts={props.collection}
        />
      );
    case 'grouping':
      return (
        <Groupings
          {...props}
          groupingDeleteHandler={props._handleDelete}
          groupings={props.collection}
        />
      );
    case 'transaction':
      return (
        <Transactions
          {...props}
          transactionDeleteHandler={props._handleDelete}
          transactions={props.collection}
        />
      );
    case 'budget':
      return (
        <Budgets
          {...props}
          budgetDeleteHandler={props._handleDelete}
          budgets={props.collection}
        />
      );
  }
};

export default type => {
  const deleteModel = handlers[type];
  const fetchModels = fetchers[type];

  const UI = withUI(type);

  class Container extends React.PureComponent {
    componentDidMount() {
      this.props.fetchModels();
    }

    constructor(props) {
      super(props);
      this._handleDelete = this._handleDelete.bind(this);
    }

    _handleDelete(_id) {
      return () => this.props.deleteModel(_id);
    }

    render() {
      return (
        <UI
          RenderMessage={Message}
          _handleDelete={this._handleDelete}
          collection={this.props.collection.toList().toJS()}
        />
      );
    }
  }

  Container.propTypes = {
    collection: ImmutablePropTypes.map,
    deleteModel: PropTypes.func.isRequired,
    fetchModels: PropTypes.func.isRequired
  };

  const mapStateToProps = state => {
    return {
      collection: state.getIn([type, 'data'])
    };
  };

  return withAuth(
    connect(mapStateToProps, { deleteModel, fetchModels })(Container)
  );
};
