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
import Layout from 'components/layout';

const SoftskillsScreen = () => {
   const navigate = useNavigate();
   const { softskills } = useSelector(
      (state) => state.soft
   );

   return (
      <Layout>
         <Heading> Soft skills </Heading>
         <Button
            onClick={() => navigate('./new')}
         >
            Agregar una nueva
         </Button>

         <Divider />

         <VStack
            spacing={5}
            w='full'
            alignItems='flex-start'
         >
            <Heading size='md'>
               Registradas
            </Heading>
            {softskills.map((softskill) => {
               return (
                  <Softskill
                     key={softskill.id}
                     info={softskill}
                  />
               );
            })}
         </VStack>
      </Layout>
   );
};

export default SoftskillsScreen;
