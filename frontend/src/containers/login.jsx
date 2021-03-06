import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { Redirect } from 'react-router-dom';

import Message from './message';
import Login from './../components/login/login';
import { logIn } from './../store/action_creators/auth';

class LoginContainer extends PureComponent {
  constructor(props) {
    super(props);
    this._handleLogin = this._handleLogin.bind(this);
  }

  _handleLogin(formProps) {
    this.props.logIn({
      email: formProps.get('email'),
      password: formProps.get('password')
    });
  }

  render() {
    return this.props.isAuthenticated ? (
      <Redirect to="/transactions" />
    ) : (
        <Login
          {...this.props}
          RenderMessage={Message}
          handleFormSubmit={this.props.handleSubmit(this._handleLogin)}
        />
      );
  }
}

LoginContainer.propTypes = {
  logIn: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.getIn(['auth', 'isAuthenticated'])
  };
};

export default connect(mapStateToProps, { logIn })(
  reduxForm({ form: 'login' })(LoginContainer)
);
