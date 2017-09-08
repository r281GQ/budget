import React from 'react';
import PropTypes from 'prop-types';

import PaddedModelContainer from './../padded_model_container';
import ModelItem from './../model_item';

const Accounts = ({ accounts, accountDeleteHandler }) => (
  <PaddedModelContainer>
    {accounts.map(account => (
      <ModelItem
        key={account._id}
        deleteHandler={accountDeleteHandler(account._id)}
        name={account.name}
        _id={account._id}
        initialBalance={account.initialBalance}
        currentBalance={account.currentBalance}
      />
    ))}
  </PaddedModelContainer>
);

Accounts.propTypes = {
  accounts: PropTypes.any,
  accountDeleteHandler: PropTypes.any
};

export default Accounts;
