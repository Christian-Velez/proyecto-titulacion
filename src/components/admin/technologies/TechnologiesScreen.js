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
import Layout from 'components/layout';
import useScrollToTop from 'hooks/useScrollToTop';

const TechnologiesScreen = () => {
   useScrollToTop();
   const navigate = useNavigate();
   const { technologies } = useSelector(
      (state) => state.tech
   );


   return (
      <Layout>
         <Heading> Tecnologías </Heading>
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
               Registradas ({technologies?.length})
            </Heading>
            {technologies.map((tech) => {
               return (
                  <Technology
                     key={tech.id}
                     info={tech}
                  />
               );
            })}
         </VStack>
      </Layout>
   );
};

export default TechnologiesScreen;
