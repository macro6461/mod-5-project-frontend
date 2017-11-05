import { combineReducers } from 'redux';
import sponsorsReducer from './sponsorsReducer';
import sponseesReducer from './sponseesReducer'
import facilitiesReducer from './facilitiesReducer'

export default combineReducers({
  sponsorsReducer, sponseesReducer, facilitiesReducer
});
