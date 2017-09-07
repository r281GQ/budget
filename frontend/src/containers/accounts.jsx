import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { reduxForm } from 'redux-form/immutable';
import { getAccounts } from './../store/action_creators/account';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

const Accounts = ({getAccounts}) => <div onClick = {getAccounts}>accounts</div>

Accounts.propTypes = {
getAccounts: PropTypes.func
};

export default connect(null, {getAccounts}) (Accounts);
