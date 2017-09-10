import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Menu } from 'semantic-ui-react';

const StyledMenu = styled(Menu)`
  &&& {
    background-color: rgba(44, 62, 80, 0.8);
    border-radius: unset;
    border: none;
    margin: 0px;
    box-shadow: unset;
  }
`;

const HeaderContainer = ({ children, borderless, stackable, size }) => (
  <StyledMenu borderless={borderless} stackable={stackable} size={size}>
    {children}
  </StyledMenu>
);

HeaderContainer.propTypes = {
  children: PropTypes.node,
  borderless: PropTypes.bool,
  stackable: PropTypes.bool,
  size: PropTypes.string
};

export default HeaderContainer;
