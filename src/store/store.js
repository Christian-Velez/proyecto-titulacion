import {
   createStore,
   combineReducers,
   applyMiddleware,
   compose,
} from 'redux';
import thunk from 'redux-thunk';
import { types } from 'types/types';


// General
import { authReducer } from 'reducers/authReducer';
import { registerReducer } from 'reducers/registerReducer';

// Admin
import { techReducer } from 'reducers/admin/techReducer';
import { softSkillReducer } from 'reducers/admin/softReducer';

// Developer
import { devReducer } from 'reducers/developer/devReducer';
import { companyReducer } from 'reducers/company/companyReducer';


// Company




const appReducers = combineReducers({
   auth: authReducer,
   register: registerReducer,

   // Admin
   tech: techReducer,
   soft: softSkillReducer,

   // Developer
   devInfo: devReducer,

   // Company
   companyInfo: companyReducer,
});



// reducer para hacer el limpiado general de todo el store
const rootReducer = (state, action) => {

   if(action.type === types.generalLogout) {
      return appReducers(undefined, action);
   }

   // Invoca al reducer general como de normal
   return appReducers(state, action);
};


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


export const store = createStore(
   rootReducer,
   composeEnhancers(applyMiddleware(thunk)) //Redux dev tools y redux thunk
); 

