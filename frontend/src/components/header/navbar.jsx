import React from 'react';

import Auth from './auth';
import Navigation from './navigation';
import HeaderContainer from './header_container';

const Navbar = props => (
  <HeaderContainer borderless size="massive" stackable>
    <Navigation {...props} />
    <Auth {...props} />
  </HeaderContainer>
);

Navbar.propTypes = {};

export default Navbar;
