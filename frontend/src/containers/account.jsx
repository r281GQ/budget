import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { createAccount } from './../store/action_creators/account';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import Account from './../components/account/account';

const AccountContainer = props => <Account {...props} />;

AccountContainer.propTypes = {};

export default connect(null, {createAccount})(reduxForm({ form: 'account' })(AccountContainer));
