

import React, { useEffect, useState } from 'react';
import {
   Box,
   Button,
   Grid,
   Heading,
   HStack,
   Image,
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
import DeveloperForm from 'components/register/DeveloperForm';
import IconImg from 'components/IconImg';

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
      <ModalForm title='Inicia sesión' onClose={onCloseLogin} isOpen={isOpenLogin}>
         <LoginForm />
      </ModalForm>


      <ModalForm title='Regístrate' onClose={onCloseRegister} isOpen={isOpenRegister}>
         <DeveloperForm />
      </ModalForm>

   
      <HStack w='full' padding={p} alignItems='stretch'>

            {/*Animacion con el telefono iPhone --> solo disponible en XL */}
            <VStack
               w='33%'
               borderRadius='lg'
               padding={10}
               justifyContent='center'
               className='cellphones'
               display={{ base: 'none', 'xl': 'flex'}}
               spacing={10}
            >
               <Box boxSize='75%'>
                  <Image src='/static/iphone12-1.png' />
               </Box>               
            </VStack>



            {/*Parte derecha */}
            <VStack
               w={{ base:'full', 'xl': '66%' }}
               alignItems='flex-start'
               minH={`calc(100vh - ${pPixels})`}
               padding={{ base: 0, 'xl': 10 , '2xl': 20}}
               spacing={{ base: 50, 'xl': 100, '2xl': 150}}

               
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


               <VStack 
                  w={{ base: 'full', 'xl': '50%', '2xl': '45%'}} 
                  alignItems='flex-start'
                  spacing={20}
               >
                  
                  <Heading  fontSize='6xl'>
                     Powerful News Explored Feed
                  </Heading> 
                  


                  <Text fontSize='2xl' className='text'>
                     Crea una cuenta y personaliza tu perfil,
                     conecta con empresas/desarrolladores
                     y establece tu primera relación laboral.
                  </Text>

               </VStack>


               {
                  lastJobs.length > 0 && 
                  <VStack 
                     spacing={10} 
                     alignItems='flex-start' 
                     w='full'
                     paddingBottom={{ base: 20, 'xl': 0 }}   
                  >
                     <Heading fontSize='2xl'> Últimos </Heading>

                     <Stack
                        w='full'
                        direction={{ base: 'column', 'xl': 'row'}}
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

