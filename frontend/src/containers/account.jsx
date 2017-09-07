import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import Account from './../components/account/account';

const AccountContainer = () => <Account />;

AccountContainer.propTypes = {};

export default connect()(reduxForm({ form: 'account' })(AccountContainer));
