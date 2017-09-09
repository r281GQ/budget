import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import {Link} from 'react-router-dom'

import { Grid, Item, Label, Button, Icon } from 'semantic-ui-react';

const Padded = styled.div`padding: 1em;`;
const Transactions = ({transactions,transactionDeleteHandler}) => (
  <Padded>
    <Grid stackable>
      <Grid.Row columns={2}>
        <Grid.Column>
          <Item.Group divided>
            {transactions.filter(transaction => transaction.grouping.type === 'income').map(transaction =><Item key = {transaction._id}>
              <Item.Content>
                <Item.Header as={Link} to={`/transaction/${transaction._id}`}>{transaction.name}</Item.Header>
                <Item.Meta>
                  <span className="cinema">{transaction.amount}</span>
                </Item.Meta>
                <Item.Description>paragraph</Item.Description>
                <Item.Extra>
                  <Label icon="globe" content="Additional Languages" as="a" />
                  <Button color="red" floated="right" onClick={transactionDeleteHandler(transaction._id)}>
                    Delete
                  </Button>
                </Item.Extra>
              </Item.Content>
            </Item>)}
          </Item.Group>
        </Grid.Column>
        <Grid.Column>
          <Item.Group divided>
            {transactions.filter(transaction => transaction.grouping.type === 'expense').map(transaction =><Item key = {transaction._id}>
              <Item.Content>
                <Item.Header as={Link} to={`/transaction/${transaction._id}`}>{transaction.name}</Item.Header>
                <Item.Meta>
                  <span className="cinema">{transaction.amount}</span>
                </Item.Meta>
                <Item.Description>paragraph</Item.Description>
                <Item.Extra>
                  <Label icon="globe" content="Additional Languages" as="a" />
                  <Button color="red" floated="right" onClick={transactionDeleteHandler(transaction._id)}>
                    Delete
                  </Button>
                </Item.Extra>
              </Item.Content>
            </Item>)}
          </Item.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Padded>
);

Transactions.propTypes = {transactions: PropTypes.any,transactionDeleteHandler:PropTypes.func};

export default Transactions;
