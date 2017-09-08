import request from './../../../../services/request';
import * as groupings from './../actions/grouping';

// export const logOut = () => dispatch =>
//   request
//     .get('/api/auth/logout')
//     .then(() => {
//       dispatch({ type: auth.LOG_OUT });
//     })
//     .catch(error => console.log(error));

export const createGrouping = account => dispatch => {
  request
    .post('/api/grouping', account)
    .then(({ data }) => {
      dispatch({ type: groupings.WRITE_GROUPING, payload: data });
    })
    .catch(error => console.log(error));
};

export const getGroupings = () => dispatch => {
  request
    .get('/api/grouping')
    .then(({ data }) => {
      dispatch({ type: groupings.WRITE_GROUPINGS, payload: data });
    })
    .catch(error => console.log(error));
};
export const updateGrouping = account => dispatch => {
  request
    .put('/api/grouping', account)
    .then(({ data }) => {
      dispatch({ type: groupings.WRITE_GROUPING, payload: data });
    })
    .catch(error => console.log(error));
};

export const deleteGrouping = _id => dispatch => {
  request
    .delete(`/api/grouping/${_id}`)
    .then(({ data }) => {
      dispatch({ type: groupings.DELETE_GROUPING, payload: _id });
    })
    .catch(error => console.log(error));
};
