import React from 'react';
import PropTypes from 'prop-types';

import PaddedModelContainer from './../padded_model_container';
import ModelItem from './../model_item';

const Groupings = ({ groupings, groupingDeleteHandler, RenderMessage }) => (
  <PaddedModelContainer>
    <RenderMessage/>
    {groupings.map(grouping => (
      <ModelItem
        modelType="grouping"
        key={grouping._id}
        deleteHandler={groupingDeleteHandler(grouping._id)}
        name={grouping.name}
        _id={grouping._id}
        description = {[{name: 'Type' , value: grouping.type}]}
      />
    ))}
  </PaddedModelContainer>
);

Groupings.propTypes = {
  groupings: PropTypes.any,
  groupingDeleteHandler: PropTypes.any,
  RenderMessage: PropTypes.any
};

export default Groupings;
