

import React from 'react';
import { useSelector } from 'react-redux';
import CompanyRegister from './CompanyRegister';
import DeveloperRegister from './DeveloperRegister';
import SelectAccount from './SelectAccount';

const RegisterScreen = () => {
   const { accountType } = useSelector(state => state.register);


   return (
      accountType
      ? 
         accountType === 'Developer'
            ? <DeveloperRegister/>
            : <CompanyRegister />
      : <SelectAccount />
   );
};

export default RegisterScreen;
