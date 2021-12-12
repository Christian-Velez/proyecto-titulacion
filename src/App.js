import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import { store } from './store/store';

const App = () => {
   /*
      IDEA PARA PROTEGER RUTAS
      
      Cuando se cargue este componente, hacer una peticion al backend
      donde le mando el token que saco de localStorage

      Lo que me regrese la API: true o false
      Lo guardo en algun lado y a partir de eso
      hago la comprobacion de si puede acceder a una ruta o no



   */

   return (
      <div>
         <Provider store={store}>
            <AppRouter />
         </Provider>
      </div>
   );
};

export default App;
