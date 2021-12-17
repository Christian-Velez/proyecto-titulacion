import {
   createStore,
   combineReducers,
   applyMiddleware,
   compose,
} from 'redux';
import thunk from 'redux-thunk';


// General
import { authReducer } from 'reducers/authReducer';
import { registerReducer } from 'reducers/registerReducer';


// Admin
import { techReducer } from 'reducers/admin/techReducer';
import { softSkillReducer } from 'reducers/admin/softReducer';

const allReducers = combineReducers({
   auth: authReducer,
   register: registerReducer,

   // Admin
   tech: techReducer,
   soft: softSkillReducer,
});


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


export const store = createStore(
   allReducers,
   composeEnhancers(applyMiddleware(thunk)) //Redux dev tools y redux thunk
); 

