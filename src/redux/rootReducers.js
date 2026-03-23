import { combineReducers } from 'redux';
import userReducer from './user/reducers';
import authReducer from './authentication/reducers';
import recollectorReducer from './recollector/reducers';
import typeIdentificationReducer from './typeIdentification/reducers';

const rootReducers = combineReducers({
  auth: authReducer,
  recollector: recollectorReducer,
  user: userReducer,
  typeIdentification: typeIdentificationReducer,
});

export default rootReducers;
