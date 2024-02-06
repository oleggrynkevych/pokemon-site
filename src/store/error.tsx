import { Action } from '@reduxjs/toolkit';

function isError(action: Action) {
  return action.type.endsWith('rejected');
}

export default isError;
