import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import { Sidebar, Menu, Icon, Header, Image, Segment } from 'semantic-ui-react';

const SideBarComponent = () => (
  <Sidebar.Pushable as={Segment}>
    <Sidebar
      as={Menu}
      animation="push"
      width="thin"
      visible
      icon="labeled"
      vertical
      inverted
    >
      <Menu.Item name="home">
        <Icon name="home" />
        Home
      </Menu.Item>
      <Menu.Item name="gamepad">
        <Icon name="gamepad" />
        Games
      </Menu.Item>
      <Menu.Item name="camera">
        <Icon name="camera" />
        Channels
      </Menu.Item>
    </Sidebar>
    <Sidebar.Pusher>
      <Segment basic>
        <Header as="h3">Application Content</Header>
        <Image src="/assets/images/wireframe/paragraph.png" />
      </Segment>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

SideBarComponent.propTypes = {};

export default SideBarComponent;
