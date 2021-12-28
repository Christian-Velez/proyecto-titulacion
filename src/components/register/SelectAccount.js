import {
   Box,
   Heading,
   HStack,
   Image,
   Stack,
   VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setAccountType } from 'actions/register';
import IconImg from 'components/IconImg';

const SelectAccount = () => {
   const dispatch = useDispatch();

   const handleSetAccountType = (type) => {
      dispatch(setAccountType(type));
   };

   return (
      <VStack
         w='full'
         spacing={50}
         className='animate__animated animate__fadeIn animate__faster'
      >
         <HStack w='full' bgColor='brand.500' justifyContent='center' color='white' padding={3}>
            <IconImg
               alt='Logo'
               src='/static/logo.png'
               boxSize={{ base: '30px'}}

            />
            <Heading> devconnect </Heading>
         </HStack>


         <Heading>
            Elige el tipo de cuenta
         </Heading>

         
         <Stack
            direction={{
               base: 'column',
               lg: 'row',
            }}
            w='full'
            justifyContent='center'
            alignItems='center'
            spacing={{ base: '20%', lg: '10%'}}
            paddingBottom={20}
         >
            <VStack
               as='button'
               onClick={() => { handleSetAccountType('Developer'); }}
               padding={10}
               borderRadius={10}
            >
               <Box boxSize='xs'>
                  <Image src='/static/programmer.png' />
               </Box>
               <Heading> Programador </Heading>
            </VStack>

            <VStack
               as='button'
               borderRadius={10}
               onClick={() => { handleSetAccountType('Company'); }}
               padding={0}
            >

               <Box boxSize='xs'>
                  <Image src='/static/empresa.png' />
               </Box>
               <Heading> Empresa </Heading>
            </VStack>


         </Stack>


      </VStack>
   );
};

export default SelectAccount;
