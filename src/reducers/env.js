import { combineActions, createAction, handleActions } from 'redux-actions';

const prefix = 'ENV';

const setUser = createAction(`${prefix}/SET_USER`, user => ({ user }));

const defaultState = {
  user: undefined,
};

export default handleActions({
  [combineActions(
    setUser,
  )]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
}, defaultState);

export const actions = {
  setUser,
};
