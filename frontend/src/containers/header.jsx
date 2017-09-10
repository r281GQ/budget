import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import getLinkNames from './../store/selectors/link_name_selector';

import { logOut } from './../store/action_creators/auth';

import Header from './../components/header/header';

const HeaderContainer = props => <Header {...props} />;

HeaderContainer.propTypes = {
  linkName: PropTypes.string,
  linkType: PropTypes.string
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
    linkName: getLinkNames(state).get('linkName'),
    linkType: getLinkNames(state).get('linkType')
  };
};

export default withRouter(
  connect(mapStateToProps, { logOut })(HeaderContainer)
);
