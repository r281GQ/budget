import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { Map } from 'immutable';

import {
  createAccount,
  updateAccount
} from './../store/action_creators/account';

import Account from './../components/account/account';

class AccountContainer extends PureComponent {
  constructor(props) {
    super(props);
    this._handleUpdateAccount = this._handleUpdateAccount.bind(this);
    this._handleCreateAccount = this._handleCreateAccount.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id !== '0') {
      this.props.initialize(
        this.props.accounts.find(
          (value, key) => key === this.props.match.params.id
        )
      );
    } else {
      this.props.initialize(
        Map()
          .set('currency', 'GBP')
          .set('initialBalance', 0)
      );
    }
  }

  _handleCreateAccount(formProps) {
    this.props.createAccount(formProps.toJS());
  }

  _handleUpdateAccount(formProps) {
    this.props.updateAccount(formProps.toJS());
  }

  render() {
    return (
      <Account
        {...this.props}
        handleFormSubmit={this.props.handleSubmit(
          this.props.match.params.id === '0'
            ? this._handleCreateAccount
            : this._handleUpdateAccount
        )}
        editForm={this.props.match.params.id !== '0' ? true : false}
      />
    );
  }
}

AccountContainer.propTypes = {
  accounts: ImmutablePropTypes.mapContains({
    _id: PropTypes.string,
    name: PropTypes.string,
    initialBalance: PropTypes.number,
    currency: PropTypes.string
  }),
  updateAccount: PropTypes.func.isRequired,
  createAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    accounts: state.getIn(['account', 'data'])
  };
};
export default connect(mapStateToProps, { createAccount, updateAccount })(
  reduxForm({ form: 'account' })(AccountContainer)
);
