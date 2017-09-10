import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import SideBar from './../sidebar/sidebar';
import { Grid, Item, Label, Button, Icon, Header } from 'semantic-ui-react';

const TransactionItem = ({ transaction, transactionDeleteHandler }) => (
  <Item key={transaction._id}>
    <Item.Content>
      <Item.Header as={Link} to={`/transaction/${transaction._id}`}>
        {transaction.name}
      </Item.Header>
      <Item.Meta>
        <span className="cinema">{transaction.amount}</span>
      </Item.Meta>
      <Item.Description>paragraph</Item.Description>
      <Item.Extra>
        <Label icon="currency" content={`Account: ${transaction.account.name}`} as={Link} to={`/account/${transaction.account._id}`} />
        <Label icon="id card" content={`Grouping: ${transaction.grouping.name}`} as={Link} to={`/grouping/${transaction.grouping._id}`} />
      { transaction.budget ? <Label icon="checked calendar" content={`Budget: ${transaction.budget.name}`} as={Link} to={`/budget/${transaction.budget._id}`} />:null}
      { transaction.equity ? <Label icon="checked calendar" content={`Budget: ${transaction.budget.name}`} as={Link} to={`/budget/${transaction.budget._id}`} />:null}
        <Button
          color="red"
          floated="right"
          onClick={transactionDeleteHandler(transaction._id)}
        >
          Delete
        </Button>
      </Item.Extra>
    </Item.Content>
  </Item>
);

TransactionItem.propTypes = {
  transaction: PropTypes.any,
  transactionDeleteHandler: PropTypes.func
};

export default TransactionItem;
