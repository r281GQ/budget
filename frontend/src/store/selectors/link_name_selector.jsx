import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const pathName = state =>
  state.getIn(['routing', 'location'])
    ? state.getIn(['routing', 'location', 'pathname']).slice(1)
    : '';

const result = pathName =>
  pathName.includes('/')
    ? fromJS({
        linkName: pathName.substring(0, pathName.indexOf('/')).concat('s'),
        linkType: 'List accounts'
      })
    : fromJS({
        linkName: pathName.slice(0, -1),
        linkType: 'create'
      });

export default createSelector(pathName, result);
