

import React, { useEffect, useState } from 'react';
import {
   Button,
   Flex,
   Grid,
   Heading,
   HStack,
   Stack,
   Text,
   useDisclosure,
   VStack
} from '@chakra-ui/react';
import { getLastJobs } from 'helpers/getLastJobs';
import JobItem from './JobItem';
import './background.css';
import ModalForm from './ModalForm';
import LoginForm from 'components/login/LoginForm';
import IconImg from 'components/layout/IconImg';


import Carrousel from './Carrousel';
import AnimatedText from './AnimatedText';
import RegisterScreen from 'components/register/RegisterScreen';


const Main = () => {
   const p = 4;
   const pPixels = p * 10 + 'px';

   const [lastJobs, setLastJobs] = useState([]);
   const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
   const { isOpen: isOpenRegister, onOpen: onOpenRegister, onClose: onCloseRegister } = useDisclosure();

   useEffect(() => {      
      getLastJobs()
         .then(jobs => setLastJobs(jobs));
   }, []);


   return (
      <>
      <ModalForm title='Inicia sesión' onClose={onCloseLogin} isOpen={isOpenLogin} scrollBehavior='outside'>
         <LoginForm />
      </ModalForm>


      <ModalForm title='Regístrate' onClose={onCloseRegister} isOpen={isOpenRegister} scrollBehavior='inside'>
         <RegisterScreen />
      </ModalForm>

   
      <HStack w='full' padding={p} alignItems='stretch'>

            {/*Animacion con el telefono iPhone --> solo disponible en XL */}
            <Carrousel />

            
            {/*Parte derecha */}
            <VStack
               w={{ base:'full', 'xl': '66%' }}
               justifyContent='space-between'
               alignItems='flex-start'
               minH={`calc(100vh - ${pPixels})`}
               padding={{ base: 0, 'xl': 10 , '2xl': '4rem'}}

               spacing={{ base: 20, 'xl': 'unset'}}
            >
               {/* Navbar */}
               <Grid
                  w='full'
                  gridTemplateColumns={{
                     base: '1fr 1fr'
                  }}
               >
                  <HStack spacing={20} alignItems='flex-end'>
                     <IconImg
                        alt='logo'
                        boxSize={{ base: '40px' }}
                        src='/static/logo.png'
                     />
                     
                  </HStack>

                  <HStack justifyContent={{ base: 'space-between', 'xl': 'flex-end'}} spacing={5} w='full'>
                     <Button colorScheme='gray' variant='outline' onClick={ onOpenLogin }> Inicia sesión </Button>
                     <Button onClick={ onOpenRegister }> Regístrate </Button> 
                  </HStack>
               </Grid>


               {/*Info principal*/}
               <VStack 
                  w='full'
                  alignItems='flex-start'
                  spacing={10}
               >  
                  <AnimatedText/>

                     <Flex maxW={{ '2xl': '50%'}}>
                        <Text fontSize='2xl' className='text'>
                           Crea una cuenta y personaliza tu perfil, conecta
                           con empresas/desarrolladores y establece tu
                           primera relación laboral.
                        </Text>
                     </Flex>

               </VStack>


               {
                  lastJobs.length > 0 && 
                  <VStack 
                     spacing={10} 
                     alignItems='flex-start' 
                     w='full'
                  >
                     <Heading fontSize='2xl'> Últimos </Heading>

                     <Stack
                        w='full'
                        direction={{ base: 'column', 'md': 'row'}}
                        spacing={20}
                        justifyContent={{ '2xl': 'flex-start' }}
                     >
                        {
                           lastJobs.map(job =>  <JobItem key={job.id} job={job}/>)
                        }

                     </Stack>
                  </VStack>
               }
            </VStack>
         </HStack>
      </>
   );
};

export default Main;

