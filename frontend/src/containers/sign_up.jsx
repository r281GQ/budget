import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { Redirect } from 'react-router-dom';
import { signUp } from './../store/action_creators/auth';

import SignUp from './../components/sign_up/sign_up';
import Message from './message';

class SignUpContainer extends PureComponent {
  constructor(props) {
    super(props);
    this._handleSignUp = this._handleSignUp.bind(this);
  }

  _handleSignUp(formProps) {
    this.props.signUp({
      email: formProps.get('email'),
      password: formProps.get('password')
    });
  }

  render() {
    return this.props.isAuthenticated ? (
      <Redirect to="/transactions" />
    ) : (
      <SignUp
        {...this.props}
        RenderMessage={Message}
        handleFormSubmit={this.props.handleSubmit(this._handleSignUp)}
      />
    );
  }
}

SignUpContainer.propTypes = {
  signUp: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.getIn(['auth', 'isAuthenticated'])
  };
};

export default connect(mapStateToProps, { signUp })(
  reduxForm({
    form: 'signup',
    asyncValidate: values =>
      new Promise(resolve =>
        axios
          .get(
            `/api/auth/unique/${values.get('email')
              ? values.get('email')
              : 'email'}`,
            {
              withCredentials: true
            }
          )
          .then(({ data: { result } }) =>
            resolve(result ? undefined : { email: 'Email is already taken!' })
          )
          .catch(() => resolve(undefined))
      )
  })(SignUpContainer)
);
