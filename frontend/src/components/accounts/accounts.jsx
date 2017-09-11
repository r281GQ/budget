import React from 'react';
import PropTypes from 'prop-types';

import PaddedModelContainer from './../padded_model_container';
import ModelItem from './../model_item';

const Accounts = ({ accounts, accountDeleteHandler, RenderMessage }) => (
  <PaddedModelContainer>
    <RenderMessage/>
    {accounts.map(account => (
      <ModelItem
        modelType="account"
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
  accountDeleteHandler: PropTypes.func.isRequired,
  RenderMessage: PropTypes.any
};

export default Accounts;
