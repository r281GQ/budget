import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { deleteAccount, getAccounts } from './../store/action_creators/account';
import {
  deleteTransaction,
  getTransactions
} from './../store/action_creators/transaction';
import {
  deleteGrouping,
  getGroupings
} from './../store/action_creators/grouping';
import Accounts from './../components/accounts/accounts';
import Groupings from './../components/groupings/groupings';
import Transactions from './../components/transactions/transactions';

import withAuth from './with_auth';

const handlers = {
  account: deleteAccount,
  grouping: deleteGrouping,
  transaction: deleteTransaction
};

const fetchers = {
  account: getAccounts,
  grouping: getGroupings,
  transaction: getTransactions
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
          _handleDelete={this._handleDelete}
          collection={this.props.collection.toList().toJS()}
        />
      );
    }
  }

  Container.propTypes = {
    collection: ImmutablePropTypes.map,
    deleteModel: PropTypes.func,
    fetchModels: PropTypes.func
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
