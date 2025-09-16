import { combineReducers } from 'redux';
import authReducer from './authentication/reducers';
import recollectorReducer from './recollector/reducers';
import typeIdentificationReducer from './typeIdentification/reducers';

const rootReducers = combineReducers({
  auth: authReducer,
  recollector: recollectorReducer,
  typeIdentification: typeIdentificationReducer,
});

export default rootReducers;
