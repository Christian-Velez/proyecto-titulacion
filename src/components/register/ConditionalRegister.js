

import React from 'react'
import { useSelector } from 'react-redux';
import BusinessRegister from './BusinessRegister';
import ProgrammerRegister from './ProgrammerRegister';
import SelectAccount from './SelectAccount'

const ConditionalRegister = () => {
   const { accountType } = useSelector(state => state.register)


   return (
      accountType
      ? 
         accountType === 'Programmer'
            ? <ProgrammerRegister/>
            : <BusinessRegister />
      : <SelectAccount />
   )
}

export default ConditionalRegister
