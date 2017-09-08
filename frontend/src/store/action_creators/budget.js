import request from './../../../../services/request';
import * as budgets from './../actions/budget';

export const createBudget = account => dispatch => {
  request
    .post('/api/budget', account)
    .then(({ data }) => {
      dispatch({ type: budgets.WRITE_BUDGET, payload: data });
    })
    .catch(error => console.log(error));
};

export const updateBudget = account => dispatch => {
  request
    .put('/api/budget', account)
    .then(({ data }) => {
      dispatch({ type: budgets.WRITE_BUDGET, payload: data });
    })
    .catch(error => console.log(error));
};

export const deleteBudget = _id => dispatch => {
  request
    .delete(`/api/budget/${_id}`)
    .then(({ data }) => {
      dispatch({ type: budgets.DELETE_GROUPING, payload: _id });
    })
    .catch(error => console.log(error));
};

export const getBudgets = () => dispatch => {
  request
    .get('/api/budget')
    .then(({ data }) => {
      dispatch({ type: budgets.WRITE_BUDGETS, payload: data });
    })
    .catch(error => console.log(error));
};
