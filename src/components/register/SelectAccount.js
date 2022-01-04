import {
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
            justifyContent='center'
            alignItems='center'
            spacing={{ base: '100px', lg: '30%'}}
            paddingY={20}
         >
            <VStack
               as='button'
               onClick={() => { handleSetAccountType('Developer'); }}
            >
               <Image src='/static/programmer.png' w={{ base: '200px', lg:'300px', 'xl': '400px'}}/>
               <Heading fontSize='2xl'> Programador </Heading>
            </VStack>

            <VStack
               as='button'
               onClick={() => { handleSetAccountType('Company'); }}
            >
               <Image src='/static/empresa.png' w={{ base: '200px', lg:'300px', 'xl': '400px'}}/>
               <Heading fontSize='2xl'> Empresa </Heading>
            </VStack>


         </Stack>


      </VStack>
   );
};

export default SelectAccount;
