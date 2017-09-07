import {fromJS} from 'immutable'
import initialState from './../initial_state'
import * as account from './../actions/account'

const reducer = (state = initialState.get('account'), {type, payload}) => {
  switch (type) {
    case account.WRITE_ACCOUNTS:

      return state.set('data', fromJS(payload))
    default:
      return state;
  }
}

export default reducer;
