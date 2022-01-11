import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import Technology from './Technology';
import {
   VStack,
   Heading,
   Button,
   Divider,
} from '@chakra-ui/react';


const TechnologiesScreen = () => {
   const navigate = useNavigate();
   const { technologies } = useSelector(state => state.tech);

   return (
      <VStack
         padding={{ base: 7, lg: 20}}
         spacing={20}
         alignItems='flex-start'
         w='full'
         className='animate__animated animate__fadeIn animate__faster'
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
               technologies.map(tech => {
                  return <Technology key={ tech.id } info={tech} />;
               })   
               
            }
         </VStack>
        
      </VStack>
   );
};

export default TechnologiesScreen;
