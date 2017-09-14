import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/*eslint react/prop-types:off*/
export default WrappedComponent => {
  const AuthAware = props => <WrappedComponent {...props} />;

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.getIn(['auth', 'isAuthenticated'])
    };
  };

  AuthAware.PropTypes = {
    isAuthenticated: PropTypes.bool
  };

  return connect(mapStateToProps)(AuthAware);
};
