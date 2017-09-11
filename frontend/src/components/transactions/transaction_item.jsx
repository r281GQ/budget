import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Item, Label, Button, Icon } from 'semantic-ui-react';

const TransactionItem = ({ transaction, transactionDeleteHandler }) => (
  <Item key={transaction._id}>
    <Item.Content>
      <Item.Header as={Link} to={`/transaction/${transaction._id}`}>
        {transaction.name}
      </Item.Header>
      <Item.Meta>
        <span className="cinema">{transaction.amount}</span>
        <Icon name="gbp" />
      </Item.Meta>
      <Item.Description>
        {moment(transaction.date).format('DD-MM-YYYY')}
      </Item.Description>
      <Item.Extra>
        <Label
          icon="currency"
          content={`Account: ${transaction.account.name}`}
          as={Link}
          to={`/account/${transaction.account._id}`}
        />
        <Label
          icon="id card"
          content={`Grouping: ${transaction.grouping.name}`}
          as={Link}
          to={`/grouping/${transaction.grouping._id}`}
        />
        {transaction.budget ? (
          <Label
            icon="checked calendar"
            content={`Budget: ${transaction.budget.name}`}
            as={Link}
            to={`/budget/${transaction.budget._id}`}
          />
        ) : null}
        {transaction.equity ? (
          <Label
            icon="checked calendar"
            content={`Equity: ${transaction.equity.name}`}
            as={Link}
            to={`/equity/${transaction.equity._id}`}
          />
        ) : null}
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
  transactionDeleteHandler: PropTypes.func.isRequired
};

export default TransactionItem;
