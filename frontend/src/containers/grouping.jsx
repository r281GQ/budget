import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import Grouping from './../components/grouping/grouping';
import { createGrouping } from './../store/action_creators/grouping';

// const GroupingContainer = props => <Grouping {...props} />;

class GroupingContainer extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  //   this._handleUpdateAccount = this._handleUpdateAccount.bind(this);
  //   this._handleCreateAccount = this._handleCreateAccount.bind(this);
  // }

  // componentDidMount() {
  //   if (this.props.match.params.id !== '0') {
  //     this.props.initialize(
  //       this.props.accounts.find(
  //         (value, key) => key === this.props.match.params.id
  //       )
  //     );
  //   } else {
  //     this.props.initialize(
  //       Map().set('currency', 'GBP').set('initialBalance', 0)
  //     );
  //   }
  // }

  // _handleCreateAccount(formProps) {
  //   console.log('called');
  //   this.props.createAccount({
  //     name: formProps.get('name'),
  //     initialBalance: formProps.get('initialBalance'),
  //     currency: formProps.get('currency')
  //   });
  // }
  //
  // _handleUpdateAccount(formProps) {
  //   this.props.updateAccount({
  //     _id: this.props.match.params.id,
  //     name: formProps.get('name')
  //   });
  // }

  render() {
    return (
      <Grouping
        {...this.props}

        editForm={this.props.match.params.id !== '0' ? true : false}
      />
    );
  }
}

// handleFormSubmit={this.props.handleSubmit(
//   this.props.match.params.id === '0'
//     ? this._handleCreateAccount
//     : this._handleUpdateAccount
// )}

GroupingContainer.propTypes = {

};

export default connect(null, {createGrouping})(reduxForm({ form: 'grouping' })(GroupingContainer));
