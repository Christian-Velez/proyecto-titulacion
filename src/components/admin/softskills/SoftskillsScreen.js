// Hooks
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Componentes
import Softskill from './Softskill';
import {
   VStack,
   Heading,
   Button,
   Divider,
} from '@chakra-ui/react';



const SoftskillsScreen = () => {
   const navigate = useNavigate();
   const { softskills } = useSelector(state => state.soft);
   
   return (
      <VStack
      padding={{ base: 7, lg: 20}}
      spacing={20}
      alignItems='flex-start'
      w='full'
      className='animate__animated animate__fadeIn animate__faster'
   >
      <Heading> Soft skills </Heading>
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
            softskills.map(softskill => {
               return <Softskill key={ softskill.id } info={softskill} />;
            })   
            
         }
      </VStack>
     
   </VStack>
   );
};

export default SoftskillsScreen;
