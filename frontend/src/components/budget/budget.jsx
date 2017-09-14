// import React from 'react';
// // import PropTypes from 'prop-types';
// // import ImmutablePropTypes from 'react-immutable-proptypes';
// // import styled from 'styled-components';
//
// const Budget = () => <div />;
//
// Budget.propTypes = {};
//
// export default Budget;
import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

import ModelForm from './../model_form';
import Currency from './../form_elements/currency';
import Name from './../form_elements/name';
import DefaultAllowance from './default_allowance';

const Budget = ({ handleFormSubmit, editForm, invalid, dirty }) => (
  <ModelForm
    name="Budget"
    icon="checked calendar"
    handleFormSubmit={handleFormSubmit}
    invalid={invalid && dirty}
  >
    <Name />
    <Form.Group widths="equal">
      <DefaultAllowance disabled={editForm}/>
      <Currency
        disabled={editForm}
        currencies={[
          {
            key: 'GBP',
            text: 'GBP',
            value: 'GBP'
          }
        ]}
      />
    </Form.Group>
  </ModelForm>
);

Budget.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
  editForm: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired
};

export default Budget;
