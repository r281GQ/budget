import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown } from 'semantic-ui-react';
import {Field} from 'redux-form/immutable'
import ReduxFormCompatibleDropDown from './../form_elements/redux_form_compatible_drop_down'



const FilterItem = ({ collection, type }) => (
  <Menu.Item>
    <Field
      placeholder={`Filter by ${type}`}
      disabled={false}
      name={type}
      
      component={ReduxFormCompatibleDropDown}
      options={collection.concat({ name: `All ${type}`, _id: 0 }).map(item => ({
        key: item._id,
        text: item.name,
        value: item._id
      }))}
    />
  </Menu.Item>
);

FilterItem.propTypes = {
  collection: PropTypes.arrayOf(PropTypes.any),
  type: PropTypes.string
};

export default FilterItem;
