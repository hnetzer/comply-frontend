import { combineReducers } from 'redux';
import authReducer from './authReducer';
import companyReducer from './companyReducer'
import adminReducer from './adminReducer'
import agencyReducer from './agencyReducer'

export default combineReducers({
 company: companyReducer,
 auth: authReducer,
 admin: adminReducer,
 agency: agencyReducer,
});
