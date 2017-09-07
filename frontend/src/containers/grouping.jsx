import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import Grouping from './../components/grouping/grouping';

const GroupingContainer = () => <Grouping />;

GroupingContainer.propTypes = {

};

export default connect()(reduxForm({ form: 'grouping' })(GroupingContainer));
