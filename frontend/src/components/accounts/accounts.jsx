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
        description={[
          { name: 'Initial Balance', value: account.initialBalance },
          { name: 'Current balance', value: account.currentBalance }
        ]}
      />
    ))}
  </PaddedModelContainer>
);

Accounts.propTypes = {
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      initialBalance: PropTypes.number,
      currentBalance: PropTypes.number
    })
  ),
  accountDeleteHandler: PropTypes.func.isRequired
};

export default Accounts;
