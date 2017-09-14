import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import PaddedModelContainer from './../padded_model_container';
import ModelItem from './../model_item';

const Budgets = ({ budgets, budgetDeleteHandler, RenderMessage }) => (
  <PaddedModelContainer>
    <RenderMessage />
    {budgets.map(budget => (
      <ModelItem
        modelType="budget"
        key={budget._id}
        deleteHandler={budgetDeleteHandler(budget._id)}
        name={budget.name}
        _id={budget._id}
        description={[
          { name: 'Default allowance', value: budget.defaultAllowance },
          { name: 'Currency', value: budget.currency }
        ]}
      />
    ))}
  </PaddedModelContainer>
);
Budgets.propTypes = {
  budgets: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string
      // initialBalance: PropTypes.number,
      // currentBalance: PropTypes.number
    })
  ),
  budgetDeleteHandler: PropTypes.func.isRequired,
  RenderMessage: PropTypes.any
};

export default Budgets;
