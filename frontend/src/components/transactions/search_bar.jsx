import React from 'react';

import { Menu, Input } from 'semantic-ui-react';

const SearchBar = () => (
  <Menu.Item>
      <Input icon='search' placeholder='Search...' />
  </Menu.Item>
);

SearchBar.propTypes = {};

export default SearchBar;
