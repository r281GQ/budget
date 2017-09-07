import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import getLinkNames from './../store/selectors/link_name_selector';
import {withRouter} from 'react-router';

import Header from './../components/header/header';

const HeaderContainer = props => {
  console.log(props);
  return <Header {...props} />}

HeaderContainer.propTypes = {
  linkName: PropTypes.string,
  linkType: PropTypes.string
};

const mapStateToProps = state => {
  return {
    linkName: getLinkNames(state).get('linkName'),
    linkType: getLinkNames(state).get('linkType')
  }
}

export default withRouter(connect(mapStateToProps) (HeaderContainer));
