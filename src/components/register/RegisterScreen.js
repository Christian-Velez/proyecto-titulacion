import React from 'react';
import { useSelector } from 'react-redux';
import CompanyForm from './CompanyForm';
import DeveloperForm from './DeveloperForm';
import SelectAccount from './SelectAccount';

const RegisterScreen = () => {
   const { accountType } = useSelector(state => state.register);

   return (
      accountType
      ? 
         accountType === 'Developer'
            ? <DeveloperForm />
            : <CompanyForm />
      : <SelectAccount />
   );
};

export default RegisterScreen;
