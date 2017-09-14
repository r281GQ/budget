import React from 'react';
import PropTypes from 'prop-types';

import GroupingType from './grouping_type';
import ModelForm from './../model_form';
import Name from './../form_elements/name';

const Grouping = ({
  handleFormSubmit,
  invalid,
  dirty,
  editForm,
  RenderMessage
}) => (
  <ModelForm
    invalid={invalid && dirty}
    name="Grouping"
    icon="id card"
    handleFormSubmit={handleFormSubmit}
    RenderMessage={RenderMessage}
  >
    <Name />
    <GroupingType disabled={editForm} />
  </ModelForm>
);

Grouping.propTypes = {
  handleFormSubmit: PropTypes.func,
  dirty: PropTypes.bool,
  editForm: PropTypes.bool,
  RenderMessage: PropTypes.any
};

export default Grouping;
