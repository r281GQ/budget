import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import getLinkNames from './../store/selectors/link_name_selector';
import Header from './../components/header/header';
import { logOut } from './../store/action_creators/auth';

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
  accounts: ImmutablePropTypes.mapContains({
    _id: PropTypes.string,
    name: PropTypes.string,
    initialBalance: PropTypes.number,
    currency: PropTypes.string
  }),
  groupings: PropTypes.any,
  budgets: PropTypes.any
};

const mapStateToProps = state => {
  return {
    linkName: getLinkNames(state).get('linkName'),
    linkType: getLinkNames(state).get('linkType'),
    isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
    userName: state.getIn(['auth', 'user', 'userName']),
    accounts: state.getIn(['account', 'data']),
    groupings: state.getIn(['grouping', 'data']),
    budgets: state.getIn(['budget', 'data'])
  };
};

export default withRouter(
  connect(mapStateToProps, { logOut })(HeaderContainer)
);
