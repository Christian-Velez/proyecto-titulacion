import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import AppRouter from './routers/AppRouter';
import { store } from './store/store';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
   return (
      <div>
         <Provider store={store}>
            <AppRouter />
            <ToastContainer
               position='bottom-right'
               autoClose={5000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               theme='colored'
            />
         </Provider>
      </div>
   );
};

export default App;
