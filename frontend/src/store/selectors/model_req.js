import { createSelector } from 'reselect';

const check = type => state => !state.getIn([type, 'data']).isEmpty();

export default type => createSelector(state => state, check(type));
