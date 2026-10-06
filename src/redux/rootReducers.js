import { combineReducers } from 'redux';
import userReducer from './user/reducers';
import authReducer from './authentication/reducers';
import recollectorReducer from './recollector/reducers';
import typeIdentificationReducer from './typeIdentification/reducers';
import wasteReducer from './waste/reducers';
import levelReducer from './level/reducers';
import orderReducer from './order/reducer';
import blogReducer from './blog/reducers';
import tipReducer from './tip/reducers';
import dashboardReducer from './dashboard/reducers';

const rootReducers = combineReducers({
  auth: authReducer,
  recollector: recollectorReducer,
  user: userReducer,
  typeIdentification: typeIdentificationReducer,
  waste: wasteReducer,
  level: levelReducer,
  order: orderReducer,
  blog: blogReducer,
  tip: tipReducer,
  dashboard: dashboardReducer,
});

export default rootReducers;
