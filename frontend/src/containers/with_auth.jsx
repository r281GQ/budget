import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

/*eslint react/prop-types:off*/
export default WrappedComponent => {
  const WithAuth = ({ isAuthenticated }) =>
    isAuthenticated ? <WrappedComponent /> : <Redirect to="/login" />;

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.getIn(['auth', 'isAuthenticated'])
    };
  };
  
  WithAuth.PropTypes = {
    isAuthenticated: PropTypes.bool
  };

  return connect(mapStateToProps)(WithAuth);
};
