import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Transaction from './transaction';
import transactionReq from './../store/selectors/transaction_requirements';

import Warning from './warning';

const Stlyed = styled.div`
  display: flex;
  height: 90vh;
  justify-content: space-around;
  align-items: center;
`;

const TransactionGuard = props => (
  <Stlyed>{props.isRoutable ? <Transaction {...props} /> : <Warning />}</Stlyed>
);

TransactionGuard.propTypes = {
  isRoutable: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    isRoutable: transactionReq(state)
  };
};

export default connect(mapStateToProps)(TransactionGuard);
