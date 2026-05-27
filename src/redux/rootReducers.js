import { combineReducers } from 'redux';
import userReducer from './user/reducers';
import authReducer from './authentication/reducers';
import recollectorReducer from './recollector/reducers';
import typeIdentificationReducer from './typeIdentification/reducers';
import wasteReducer from './waste/reducers';
import levelReducer from './level/reducer';
import orderReducer from './order/reducer';

const rootReducers = combineReducers({
  auth: authReducer,
  recollector: recollectorReducer,
  user: userReducer,
  typeIdentification: typeIdentificationReducer,
  waste: wasteReducer,
  level: levelReducer,
  order: orderReducer,
});

export default rootReducers;
