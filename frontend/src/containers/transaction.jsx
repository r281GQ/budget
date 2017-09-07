import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import Transaction from './../components/transaction/transaction';

const TransactionContainer = () => <Transaction />;

TransactionContainer.propTypes = {};

export default connect()(
  reduxForm({ form: 'transaction' })(TransactionContainer)
);
