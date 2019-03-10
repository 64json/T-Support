import { actions as envActions } from './env';

export { default as env } from './env';

export const actions = {
  ...envActions,
};
