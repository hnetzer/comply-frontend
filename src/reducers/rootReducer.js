import { combineReducers } from 'redux';
import filingReducer from './filingReducer';
import authReducer from './authReducer';

export default combineReducers({
 filing: filingReducer,
 auth: authReducer,
});
