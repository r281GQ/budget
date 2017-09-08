import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Search } from 'semantic-ui-react';

const StyledMenu = styled(Menu)`
  &&& {
    background-color: rgba(44, 62, 80, 0.8);
    border-radius: unset;
    border: none;
  }
`;

const Header = ({ linkName, linkType, logOut }) => (
  <div>
    <StyledMenu borderless size="massive" stackable>
      <Menu.Menu position="left">
        {linkType === 'create' ? (
          <Menu.Item
            as={Link}
            to={`/${linkName}/0`}
            content="create"
            icon="plus circle"
          />
        ) : (
          <Menu.Item
            as={Link}
            to={`/${linkName}`}
            content="list items"
            icon="browser"
          />
        )}
        <Menu.Item
          as={Link}
          to="/transactions"
          content="Transactions"
          icon="usd"
        />
        <Menu.Item
          as={Link}
          to="/accounts"
          content="Accounts"
          icon="currency"
        />
        <Menu.Item
          as={Link}
          to="/groupings"
          content="Groupings"
          icon="id card"
        />
        <Menu.Item
          as={Link}
          to="/budgets"
          content="Budgets"
          icon="checked calendar"
        />
      </Menu.Menu>
      <Menu.Menu position="right">
        <Menu.Item content="Endre" />
        <Menu.Item content="LogOut" icon="log out" onClick = {logOut}/>
      </Menu.Menu>
    </StyledMenu>
    <StyledMenu>
      <Menu.Menu>
        {' '}
        <Menu.Item>
          <Dropdown
            placeholder="Filter account"
            selection
            options={[{ text: 'sdf', key: 1, value: 3 }]}
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown
            placeholder="Filter date"
            selection
            options={[{ text: 'sdf', key: 1 }]}
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown
            placeholder="Filter grouping"
            selection
            options={[{ text: 'sdf', key: 1 }]}
          />
        </Menu.Item>
        <Menu.Item>
          <Search fluid />
        </Menu.Item>
        <Menu.Item>
          <Dropdown
            placeholder="Filter budget"
            selection
            options={[{ text: 'sdf', key: 1 }]}
          />
        </Menu.Item>
      </Menu.Menu>
    </StyledMenu>
  </div>
);

Header.propTypes = {
  linkName: PropTypes.string,
  linkType: PropTypes.string,
  logOut: PropTypes.any
};

export default Header;
