import React from 'react';
import PropTypes from 'prop-types';

import GroupingType from './grouping_type';
import ModelForm from './../model_form';
import Name from './../form_elements/name';

const Grouping = ({
  handleFormSubmit,
  invalid,
  dirty,
  editForm
}) => (
  <ModelForm
    invalid={invalid && dirty}
    name="Grouping"
    icon="id card"
    handleFormSubmit={handleFormSubmit}
  >
    <Name />
    <GroupingType disabled={editForm} />
  </ModelForm>
);

Grouping.propTypes = {
  handleFormSubmit: PropTypes.func,
  dirty: PropTypes.bool,
  editForm: PropTypes.bool
};

export default Grouping;
