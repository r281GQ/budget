import React from 'react';
import PropTypes from 'prop-types';

import GroupingType from './grouping_type';
import ModelForm from './../model_form';
import Name from './../form_elements/name';

const Grouping = ({
  handleSubmit,
  createGrouping,
  invalid,
  dirty,
  editForm
}) => (
  <ModelForm
    invalid={invalid && dirty}
    name="Grouping"
    icon="id card"
    handleFormSubmit={handleSubmit(formProps => {
      createGrouping({
        name: formProps.get('name'),
        type: formProps.get('type')
      });
    })}
  >
    <Name />
    <GroupingType disabled={editForm} />
  </ModelForm>
);

Grouping.propTypes = {
  createGrouping: PropTypes.func,
  dirty: PropTypes.bool,
  editForm: PropTypes.bool
};

export default Grouping;
