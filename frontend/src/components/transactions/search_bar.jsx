import React from 'react';
import {Field} from 'redux-form/immutable'
import { Menu, Input } from 'semantic-ui-react';

const SearchBar = () => (
  <Menu.Item>
    <Field
      name = "name"
      placeholder='Search...'
      disabled={false}
      icon = 'search'
      component={Input}
    />
  </Menu.Item>
);

SearchBar.propTypes = {};

export default SearchBar;
