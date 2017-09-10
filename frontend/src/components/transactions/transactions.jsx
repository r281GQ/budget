import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import {Link} from 'react-router-dom'
import SideBar from './../sidebar/sidebar'
import { Grid, Item, Label, Button, Icon, Header } from 'semantic-ui-react';
import TransactionItem from './transaction_item'

const Padded = styled.div`padding: 1em;`;
const Transactions = ({transactions,transactionDeleteHandler}) => (

  <Padded>
    <Grid stackable>
      <Grid.Row columns={2}>
        <Grid.Column>
          <Header block as="h2"  content='Incomes' color="green" />
          <Item.Group divided>
            {transactions.filter(transaction => transaction.grouping.type === 'income').map(transaction => <TransactionItem key={transaction._id} transaction ={transaction} transactionDeleteHandler={transactionDeleteHandler} />)}
          </Item.Group>
        </Grid.Column>
        <Grid.Column>
          <Header block as="h2"  content='Expenses' color="red" />
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
