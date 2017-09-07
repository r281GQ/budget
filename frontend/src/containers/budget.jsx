import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import Budget from './../components/budget/budget';

const BudgetContainer = () => <Budget />;

BudgetContainer.propTypes = {

};

export default connect()(reduxForm({ form: 'budget' })(BudgetContainer));
