

import React from 'react'
import { useSelector } from 'react-redux';
import BusinessRegister from './BusinessRegister';
import DeveloperRegister from './DeveloperRegister';
import SelectAccount from './SelectAccount'

const RegisterScreen = () => {
   const { accountType } = useSelector(state => state.register)


   return (
      accountType
      ? 
         accountType === 'Programmer'
            ? <DeveloperRegister/>
            : <BusinessRegister />
      : <SelectAccount />
   )
}

export default RegisterScreen
