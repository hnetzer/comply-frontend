import { combineReducers } from 'redux';
import filingReducer from './filingReducer';
import authReducer from './authReducer';
import companyReducer from './companyReducer'

export default combineReducers({
 filing: filingReducer,
 company: companyReducer,
 auth: authReducer,
});
