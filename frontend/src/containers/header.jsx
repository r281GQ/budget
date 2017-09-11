import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import getLinkNames from './../store/selectors/link_name_selector';

import { logOut } from './../store/action_creators/auth';

import Header from './../components/header/header';

const HeaderContainer = props => (
  <Header
    {...props}
    accounts={props.accounts.toList().toJS()}
    groupings={props.groupings.toList().toJS()}
    budgets={props.budgets.toList().toJS()}
  />
);

HeaderContainer.propTypes = {
  linkName: PropTypes.string,
  linkType: PropTypes.string,
  accounts: PropTypes.any,
  groupings: PropTypes.any,
  budgets: PropTypes.any
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
    userName: state.getIn(['auth', 'user', 'userName']),
    linkName: getLinkNames(state).get('linkName'),
    linkType: getLinkNames(state).get('linkType'),
    accounts: state.getIn(['account', 'data']),
    groupings: state.getIn(['grouping', 'data']),
    budgets: state.getIn(['budget', 'data'])
  };
};

export default withRouter(
  connect(mapStateToProps, { logOut })(HeaderContainer)
);
