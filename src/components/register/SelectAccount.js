import {
   Button,
   Text,
   VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setAccountType } from 'actions/register';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const SelectAccount = () => {
   const dispatch = useDispatch();

   const handleSetAccountType = (type) => {
      dispatch(setAccountType(type));
   };

   return (
      <VStack
         w='full'
         spacing={5}
         className='animate__animated animate__fadeIn animate__faster'
         alignItems='flex-start'
      >
         <Text> Soy un/a...</Text>

         <Button
            variant='outline'
            rightIcon={<ArrowForwardIcon />}
            onClick={ () => handleSetAccountType('Developer')}
         >
            Programador
         </Button>
         <Button
            variant='outline'
            rightIcon={<ArrowForwardIcon />}
            onClick={ () => handleSetAccountType('Company') }
         >
            Empresa
         </Button>
      </VStack>
   );
};

export default SelectAccount;
