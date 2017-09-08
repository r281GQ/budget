import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { deleteGrouping } from './../store/action_creators/grouping';
import Groupings from './../components/groupings/groupings';

class GroupingsContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this._handleDeleteGrouping = this._handleDeleteGrouping.bind(this);
  }

  _handleDeleteGrouping(_id) {
    return () => this.props.deleteGrouping(_id);
  }

  render() {
    return (
      <Groupings
        groupingDeleteHandler={this._handleDeleteGrouping}
        groupings={this.props.groupings.toList().toJS()}
      />
    );
  }
}

GroupingsContainer.propTypes = {
  groupings: ImmutablePropTypes.map,
  deleteGrouping: PropTypes.func
};

const mapStateToProps = state => {
  return {
    groupings: state.getIn(['grouping', 'data'])
  };
};

export default connect(mapStateToProps, { deleteGrouping })(GroupingsContainer);
