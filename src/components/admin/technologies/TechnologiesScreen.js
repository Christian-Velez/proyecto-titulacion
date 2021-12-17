import React from 'react';

import {
   VStack,
   Heading,
   Button,
   Divider,
} from '@chakra-ui/react';
import Technology from './Technology';
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';


const TechnologiesScreen = () => {
   const navigate = useNavigate();
   const { technologies } = useSelector(state => state.tech);




   return (
      <VStack
         padding={{ base: 7, lg: 20}}
         spacing={20}
         alignItems='flex-start'
         w='full'
      >
         <Heading> Tecnologías </Heading>
         <Button
            onClick={ () => navigate('./new') }
         > Agregar una nueva </Button>

         <Divider />


         <VStack
            spacing={5}
            w='full'
            alignItems='flex-start'
         >
            <Heading size='md'> Registradas </Heading>
            {
               technologies.map(technology => {
                  const { id, ...rest } = technology;
                  const info = {
                     id,
                     ...rest
                  };
                  return <Technology key={ id } info={info} />;
               })   
               
            }
         </VStack>
        
      </VStack>
   );
};

export default TechnologiesScreen;
