import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form/immutable';
import { Map } from 'immutable';

import Message from './message';
import Grouping from './../components/grouping/grouping';
import {
  createGrouping,
  updateGrouping
} from './../store/action_creators/grouping';

class GroupingContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this._handleUpdateGrouping = this._handleUpdateGrouping.bind(this);
    this._handleCreateGrouping = this._handleCreateGrouping.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id !== '0') {
      this.props.initialize(
        this.props.groupings.find(
          (value, key) => key === this.props.match.params.id
        )
      );
    } else {
      this.props.initialize(Map().set('type', 'income'));
    }
  }

  _handleCreateGrouping(formProps) {
    if (!formProps.get('name')) throw new SubmissionError({ _error: 'Name' });
    this.props.createGrouping(formProps.toJS());
  }

  _handleUpdateGrouping(formProps) {
    if (!formProps.get('name')) throw new SubmissionError({ _error: 'Name' });
    this.props.updateGrouping(formProps.toJS());
  }

  render() {
    return (
      <Grouping
        {...this.props}
        RenderMessage = {Message}
        handleFormSubmit={this.props.handleSubmit(
          this.props.match.params.id === '0'
            ? this._handleCreateGrouping
            : this._handleUpdateGrouping
        )}
        editForm={this.props.match.params.id !== '0' ? true : false}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    groupings: state.getIn(['grouping', 'data'])
  };
};

GroupingContainer.propTypes = {
  groupings: ImmutablePropTypes.mapContains({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.oneOf(['income', 'expense'])
  }),
  createGrouping: PropTypes.func.isRequired,
  updateGrouping: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { createGrouping, updateGrouping })(
  reduxForm({ form: 'grouping' })(GroupingContainer)
);
