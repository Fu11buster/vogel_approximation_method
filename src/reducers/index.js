import { combineReducers } from 'redux';
import matrix from './matrix';
import solve from './solve';

const rootReducer = combineReducers({ matrix, solve });

export default rootReducer;