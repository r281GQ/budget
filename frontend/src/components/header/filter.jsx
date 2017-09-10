import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Menu, Dropdown, Search } from 'semantic-ui-react';

const StyledMenu = styled(Menu)`
  &&& {
    background-color: rgba(44, 62, 80, 0.8);
    border-radius: unset;
    border: none;
    margin: 0px;
    box-shadow: unset;
  }
`;

const Filter = ({ isAuthenticated, history }) =>
  isAuthenticated && history.location.pathname === '/transactions' ? (
    <StyledMenu borderless>
      <Menu.Menu>
        <Menu.Item>
          <Dropdown
            placeholder="Filter by account"
            selection
            options={[{ text: 'sdf', key: 1, value: 3 }]}
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown
            placeholder="Filter by grouping"
            selection
            options={[{ text: 'sdf', key: 1 }]}
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown
            placeholder="Filter by budget"
            selection
            options={[{ text: 'sdf', key: 1 }]}
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown
            placeholder="Filter by date"
            selection
            options={[{ text: 'sdf', key: 1 }]}
          />
        </Menu.Item>
        <Menu.Item>
          <Search fluid />
        </Menu.Item>
      </Menu.Menu>
    </StyledMenu>
  ) : null;

Filter.propTypes = {
  isAuthenticated: PropTypes.bool
};

export default Filter;
