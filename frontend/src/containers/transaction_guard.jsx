import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Transaction from './transaction';
import Warning from './../components/warning';
import transactionReq from './../store/selectors/transaction_requirements';
import withAuth from './with_auth';

const TransactionGuard = props =>
  props.isRoutable ? (
    <Transaction {...props} />
  ) : (
      <Warning
        header="You must create an account and a grouping before you can create a transaction!"
        text="Go the the account or grouping page to do that"
      />
    );

TransactionGuard.propTypes = {
  isRoutable: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    isRoutable: transactionReq(state)
  };
};

export default withAuth(connect(mapStateToProps)(TransactionGuard));
