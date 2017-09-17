
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { Map } from 'immutable';

import Message from './message';
import withAuth from './with_auth'
import { createBudget, updateBudget } from './../store/action_creators/budget';

import Budget from './../components/budget/budget';

class BudgetContainer extends PureComponent {
  constructor(props) {
    super(props);
    this._handleUpdateBudget = this._handleUpdateBudget.bind(this);
    this._handleCreateBudget = this._handleCreateBudget.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id !== '0') {
      this.props.initialize(
        this.props.budgets.find(
          (value, key) => key === this.props.match.params.id
        )
      );
    } else {
      this.props.initialize(
        Map()
          .set('defaultAllowance', 0)
          .set('currency', 'GBP')
      );
    }
  }

  _handleCreateBudget(formProps) {
    this.props.createBudget(formProps.toJS());
  }

  _handleUpdateBudget(formProps) {
    this.props.updateBudget(formProps.toJS());
  }

  render() {
    return (
      <Budget
        {...this.props}
        RenderMessage={Message}
        handleFormSubmit={this.props.handleSubmit(
          this.props.match.params.id === '0'
            ? this._handleCreateBudget
            : this._handleUpdateBudget
        )}
        editForm={this.props.match.params.id !== '0' ? true : false}
      />
    );
  }
}

BudgetContainer.propTypes = {
  budgets: ImmutablePropTypes.mapContains({
    _id: PropTypes.string,
    name: PropTypes.string
  }),
  updateBudget: PropTypes.func.isRequired,
  createBudget: PropTypes.func.isRequired
};
const mapStateToProps = state => {
  return {
    budgets: state.getIn(['budget', 'data'])
  };
};
export default withAuth(connect(mapStateToProps, { createBudget, updateBudget })(
  reduxForm({ form: 'budget' })(BudgetContainer)
));
