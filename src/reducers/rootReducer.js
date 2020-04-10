import { combineReducers } from 'redux';
import filingReducer from './filingReducer';
import authReducer from './authReducer';
import companyReducer from './companyReducer'
import adminReducer from './adminReducer'

export default combineReducers({
 filing: filingReducer,
 company: companyReducer,
 auth: authReducer,
 admin: adminReducer,
});
