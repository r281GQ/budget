import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { reduxForm } from 'redux-form/immutable';
import Transactions from './../components/transactions/transactions';
import Message from './message';
// import Filter from './filter'
import { Map } from 'immutable';

import { getTransactions } from './../store/action_creators/transaction';

class TransactionsContainer extends PureComponent {
  componentDidMount() {
    this.props.initialize(
      Map().withMutations(map =>
        map
          .set('account', 0)
          .set('budget', 0)
          .set('grouping', 0)
          .set('date', 0)
      )
    );
  }

  componentWillUnmount() {}

  render() {
    return (
      <Transactions
        {...this.props}
        RenderMessage={Message}
        accounts={this.props.accounts.toList().toJS()}
        groupings={this.props.groupings.toList().toJS()}
        budgets={this.props.budgets.toList().toJS()}
        handleFormSubmit={this.props.handleSubmit(formProps => {
          const f = {};

          if(formProps.get('name')) f.name = formProps.get('name')
          if(formProps.get('account') !== 0) f.account = formProps.get('account')
          if(formProps.get('grouping') !== 0) f.grouping = formProps.get('grouping')
          if(formProps.get('date') !== 0) f.date = formProps.get('date')
          if(formProps.get('budget') !== 0) f.budget = formProps.get('budget')
          if(formProps.get('last') !== 0) f.last = formProps.get('last')
          // if(formProps.get('account') !== 0) f.name = formProps.get('name')
          this.props.getTransactions(f);
        })}
      />
    );
  }
}

TransactionsContainer.propTypes = {
  accounts: ImmutablePropTypes.mapContains({
    _id: PropTypes.string
  }),
  groupings: ImmutablePropTypes.map,
  budgets: ImmutablePropTypes.map,
  getTransactions: PropTypes.any
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
