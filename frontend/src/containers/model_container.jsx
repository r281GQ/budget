import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { deleteAccount } from './../store/action_creators/account';
import { deleteGrouping } from './../store/action_creators/grouping';
import Accounts from './../components/accounts/accounts';
import Groupings from './../components/groupings/groupings';

import withAuth from './with_auth';

const handlers = {
  account: deleteAccount,
  grouping: deleteGrouping
};

/*eslint react/display-name: off*/
/*eslint react/prop-types: off*/
const withUI = type => props => {
  switch (type) {
    case 'account':
      return (
        <Accounts
          {...props}
          accountDeleteHandler={props._handleDelete}
          accounts={props.collection}
        />
      );
    case 'grouping':
      return (
        <Groupings
          {...props}
          groupingDeleteHandler={props._handleDelete}
          groupings={props.collection}
        />
      );
  }
};

export default type => {
  const deleteModel = handlers[type];

  const UI = withUI(type);

  class Container extends React.PureComponent {
    constructor(props) {
      super(props);
      this._handleDelete = this._handleDelete.bind(this);
    }

    _handleDelete(_id) {
      return () => this.props.deleteModel(_id);
    }

    render() {
      return (
        <UI
          _handleDelete={this._handleDelete}
          collection={this.props.collection.toList().toJS()}
        />
      );
    }
  }

  Container.propTypes = {
    collection: ImmutablePropTypes.map,
    deleteModel: PropTypes.func
  };

  const mapStateToProps = state => {
    return {
      collection: state.getIn([type, 'data'])
    };
  };

  return withAuth(connect(mapStateToProps, { deleteModel })(Container));
};
