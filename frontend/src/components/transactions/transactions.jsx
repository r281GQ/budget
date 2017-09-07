import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import { Grid, Item, Label, Button, Icon } from 'semantic-ui-react';

const Padded = styled.div`padding: 1em;`;
const Transactions = () => (
  <Padded>
    <Grid stackable>
      <Grid.Row columns={2}>
        <Grid.Column>
          <Item.Group divided>
            <Item>
              <Item.Content>
                <Item.Header as="a">12 Years a Slave</Item.Header>
                <Item.Meta>
                  <span className="cinema">Union Square 14</span>
                </Item.Meta>
                <Item.Description>paragraph</Item.Description>
                <Item.Extra>
                  <Label>IMAX</Label>
                  <Label as="a">Exciting</Label>
                  <Label icon="globe" content="Additional Languages" />
                  <Button color="red" floated="right">
                    Delete
                  </Button>
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column>d</Grid.Column>
      </Grid.Row>
    </Grid>
  </Padded>
);

Transactions.propTypes = {};

export default Transactions;
