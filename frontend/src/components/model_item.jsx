import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Item, Button, Label } from 'semantic-ui-react';

const ModelItem = ({
  deleteHandler,
  name,
  _id,
  initialBalance,
  currentBalance
}) => (
  <Item key={_id}>
    <Item.Content>
      <Item.Header as={Link} to={`/account/${_id}`}>
        {name}
      </Item.Header>
      <Item.Meta>
        <span className="cinema">Initial balance: {initialBalance}</span>
      </Item.Meta>
      <Item.Description>Blanace: {currentBalance}</Item.Description>
      <Item.Extra>
        <Label>IMAX</Label>
        <Label as="a">Exciting</Label>
        <Label icon="globe" content="Additional Languages" />
        <Button color="red" onClick={deleteHandler} floated="right">
          Delete
        </Button>
      </Item.Extra>
    </Item.Content>
  </Item>
);

ModelItem.propTypes = {
  name: PropTypes.string,
  currentBalance: PropTypes.any,
  initialBalance: PropTypes.any,
  _id: PropTypes.any,
  deleteHandler: PropTypes.any
};

export default ModelItem;
