import {
   createStore,
   combineReducers,
   applyMiddleware,
   compose,
} from 'redux';
import thunk from 'redux-thunk';



import { authReducer } from 'reducers/authReducer';
import { registerReducer } from 'reducers/registerReducer';
import { techReducer } from 'reducers/admin/techReducer';


const allReducers = combineReducers({
   auth: authReducer,
   register: registerReducer,
   tech: techReducer
});


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


export const store = createStore(
   allReducers,
   composeEnhancers(applyMiddleware(thunk)) //Redux dev tools y redux thunk
); 

