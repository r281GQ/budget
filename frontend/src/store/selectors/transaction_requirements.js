import { createSelector } from 'reselect';

const accounts = state => state.getIn(['account', 'data']);
const groupings = state => state.getIn(['grouping', 'data']);

const check = (accounts, groupings) =>
  !(accounts.isEmpty() || groupings.isEmpty());

export default createSelector(accounts, groupings, check);
