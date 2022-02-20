import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const StoreContext = createContext();



// Reducer
const initialStore = {

};

const editDeveloperProfileReducer = (state, action) => {
   switch (action.type) {
   default:
      return state;
   }
};





const DeveloperProvider = ({ children }) => {
   const [store, dispatch] = useReducer(editDeveloperProfileReducer, initialStore);

   return (
      <StoreContext.Provider value={[store, dispatch]}>
         { children }
      </StoreContext.Provider>
   );
};

DeveloperProvider.propTypes = {
   children: PropTypes.element
};

export { StoreContext };
export default DeveloperProvider;