import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { deleteAccount } from './../store/action_creators/account';
import Accounts from './../components/accounts/accounts';

class AccountsContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this._handleDeleteAccount = this._handleDeleteAccount.bind(this);
  }

  _handleDeleteAccount(_id) {
    return () => this.props.deleteAccount(_id);
  }

  render() {
    return (
      <Accounts
        accountDeleteHandler={this._handleDeleteAccount}
        accounts={this.props.accounts.toList().toJS()}
      />
    );
  }
}

AccountsContainer.propTypes = {
  accounts: ImmutablePropTypes.map,
  deleteAccount: PropTypes.func
};

const mapStateToProps = state => {
  return {
    accounts: state.getIn(['account', 'data'])
  };
};

export default connect(mapStateToProps, { deleteAccount })(AccountsContainer);
