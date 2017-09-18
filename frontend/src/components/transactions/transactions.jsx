import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Item, Header } from 'semantic-ui-react';

import TransactionItem from './transaction_item';
import Filter from './filter';

const Padded = styled.div`padding: 1em;`;
const Transactions = ({
  transactions,
  transactionDeleteHandler,
  accounts,
  groupings,
  budgets,
  RenderMessage,
  handleFormSubmit
}) => (
  <div>
    <Filter accounts={accounts} groupings={groupings} budgets={budgets} handleFormSubmit = {handleFormSubmit}/>
    <Padded>
      <Grid stackable>
        <Grid.Row columns={1}>
          <Grid.Column>
            <RenderMessage />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Header block as="h2" content="Incomes" color="green" />
            <Item.Group divided>
              {transactions
                .filter(transaction => transaction.grouping.type === 'income')
                .map(transaction => (
                  <TransactionItem
                    key={transaction._id}
                    transaction={transaction}
                    transactionDeleteHandler={transactionDeleteHandler}
                  />
                ))}
            </Item.Group>
          </Grid.Column>
          <Grid.Column>
            <Header block as="h2" content="Expenses" color="red" />
            <Item.Group divided>
              {transactions
                .filter(transaction => transaction.grouping.type === 'expense')
                .map(transaction => (
                  <TransactionItem
                    key={transaction._id}
                    transaction={transaction}
                    transactionDeleteHandler={transactionDeleteHandler}
                  />
                ))}
            </Item.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Padded>
  </div>
);

Transactions.propTypes = {
  transactions: PropTypes.any,
  accounts: PropTypes.any,
  groupings: PropTypes.any,
  budgets: PropTypes.any,
  RenderMessage: PropTypes.any,
  transactionDeleteHandler: PropTypes.func,
  handleFormSubmit: PropTypes.func
};

export default Transactions;
