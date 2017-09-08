import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import withAuth from './with_auth';

import Transaction from './../components/transaction/transaction';

const TransactionContainer = props => <Transaction {...props} />;

TransactionContainer.propTypes = {};

export default withAuth(
  connect()(reduxForm({ form: 'transaction', shouldValidate:() => true })(TransactionContainer))
);
