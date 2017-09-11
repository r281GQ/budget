import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Transactions from './../components/transactions/transactions';

class TransactionsContainer extends PureComponent {
  componentWillUnmount() {}

  render() {
    return (
      <Transactions
        {...this.props}
        accounts={this.props.accounts.toList().toJS()}
        groupings={this.props.groupings.toList().toJS()}
        budgets={this.props.budgets.toList().toJS()}
      />
    );
  }
}

TransactionsContainer.propTypes = {
  accounts: ImmutablePropTypes.mapContains({
    _id:PropTypes.string
  }),
  groupings: ImmutablePropTypes.map,
  budgets: ImmutablePropTypes.map
};

const mapStateToProps = state => {
  return {
    accounts: state.getIn(['account', 'data']),
    budgets: state.getIn(['budget', 'data']),
    equities: state.getIn(['equity', 'data']),
    groupings: state.getIn(['grouping', 'data'])
  };
};

export default connect(mapStateToProps)(TransactionsContainer);
