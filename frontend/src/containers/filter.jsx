import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import FilterComponent from './filter'

class Filter extends PureComponent{
  render(){
    return (<FilterComponent {...this.props}/>);
  }
}

Filter.propTypes = {
  accounts: PropTypes.any,
  groupings: PropTypes.any,
  budgets: PropTypes.any
};

export default Filter;
