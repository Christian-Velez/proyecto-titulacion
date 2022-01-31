
import React from 'react';
import TechnologiesCards from './TechnologiesCards';
import ProjectsCards from './ProjectsCards';
import CertificationsCards from './CertificationsCards';
import SoftskillsCards from './SoftskillsCards';
import EducationCards from './EducationCards';
import {
   Divider,
   Text,
   Heading,
   HStack,
   VStack,
} from '@chakra-ui/react';

import PropTypes from 'prop-types';



const Body = ({ devInfo }) => {
   return (
      <VStack
         w='full'
         alignItems='flex-start'
         spacing={10}
      >
         <Divider />
         <VStack
            w={{ base: 'full', xl: '50%' }}
            alignItems='flex-start'
         >
            <Heading fontSize={{ base: 'lg', '2xl': 'xl' }}>
               Calificaciones
            </Heading>

            <VStack w='full' p={5}>
               <HStack
                  w='full'
                  justifyContent='space-between'
               >
                  <Text> Responsable </Text> <Text fontWeight='black'>0.0 / 5</Text>
               </HStack>

               <HStack
                  w='full'
                  justifyContent='space-between'
               >
                  <Text> Comprometido </Text> <Text fontWeight='black'>0.0 / 5</Text>
               </HStack>

               <HStack
                  w='full'
                  justifyContent='space-between'
               >
                  <Text> Cooperativo </Text><Text fontWeight='black'>0.0 / 5</Text>
               </HStack>

               <HStack
                  w='full'
                  justifyContent='space-between'
               >
                  <Text>Manejo de conflictos</Text><Text fontWeight='black'>0.0 / 5</Text>
               </HStack>
            </VStack>
         </VStack>

         <Divider />
         <VStack w='full' alignItems='flex-start'>
            <Heading fontSize={{ base: 'lg', '2xl': 'xl' }}>
               Tecnologías
            </Heading>

            <TechnologiesCards devInfo={devInfo}/>
         </VStack>

         <Divider />
         <VStack w='full' alignItems='flex-start'>
            <Heading fontSize={{ base: 'lg', '2xl': 'xl' }}>
               Proyectos
            </Heading>
            <Text color='gray.600' fontSize={{ base: 'sm', xl:'md'}}> Los links proporcionados son externos a la plataforma y responsabilidad del desarrollador que los registra en su perfil. No se garantiza la seguridad al hacer click.</Text>

            <ProjectsCards devInfo={devInfo}/>
         </VStack>

         <Divider />
         <VStack w='full' alignItems='flex-start'>
            <Heading fontSize={{ base: 'lg', '2xl': 'xl' }}>
               Educación
            </Heading>
            
            <EducationCards devInfo={devInfo}/>
         </VStack>

         <Divider />
         <VStack w='full' alignItems='flex-start'>
            <Heading fontSize={{ base: 'lg', '2xl': 'xl' }}>
               Licencias y certificaciones
            </Heading>
            
            <CertificationsCards devInfo={devInfo}/>
         </VStack>

         <Divider />
         <VStack w='full' alignItems='flex-start'>
            <Heading fontSize={{ base: 'lg', '2xl': 'xl' }}>
               Mis soft skills
            </Heading>
           
            <SoftskillsCards devInfo={devInfo}/>
         </VStack>
      </VStack>
   );
};


Body.propTypes = {
   devInfo: PropTypes.object
};

export default Body;
