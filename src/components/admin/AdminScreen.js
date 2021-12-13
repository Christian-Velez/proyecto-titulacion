import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { types } from '../../types/types';

const AdminScreen = () => {
   console.log('admin screen');
   const dispatch = useDispatch();

   const handleLogout = () => {
      localStorage.removeItem('logged');

      dispatch({
         type: types.logout,
      });
   };
   return (
      <div>
         SOY UN ADMIN PA
         <div>
            <button onClick={handleLogout}>
               desloguear pa
            </button>

            <Link to='/dos'> DOS </Link>
         </div>
      </div>
   );
};

export default AdminScreen;
