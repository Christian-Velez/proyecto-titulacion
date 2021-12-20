import React from 'react';
import {
   Heading,
   VStack
} from '@chakra-ui/react';
import AddNewSoftForm from './AddNewSoftForm';


const AddNewSoft = () => {
   return (
      <VStack
         padding={{ base: 7, lg: 20 }}
         spacing={20}
         alignItems='flex-start'
         w='full'
         className='animate__animated animate__fadeIn animate__faster'
      >
         <Heading>
            Agregar nueva soft skill
         </Heading>

         <AddNewSoftForm />

         
         
      </VStack>
   );
};

export default AddNewSoft;