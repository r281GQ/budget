import React from 'react';

import NavBar from './navbar';
import Filter from './filter';

const Header = props => (
  <div>
    <NavBar {...props} />
    <Filter {...props} />
  </div>
);

export default Header;
