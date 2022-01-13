import {
   Button,
   Flex,
   Heading,
   HStack,
   Icon,
   Stack,
   Text,
   VStack,
} from '@chakra-ui/react';
import IconImg from 'components/IconImg';
import React from 'react';
import { AiOutlineDownload } from 'react-icons/ai';
import { format } from 'timeago.js';
import PropTypes from 'prop-types';
import { HiLocationMarker} from 'react-icons/hi';

// Cambiar el idioma de timeAgo a español
import 'helpers/timeAgoRegister';


const MainInfo = ({ userInfo }) => {
   const {
      name,
      location,
      description,
      img,
      kind,
      line,
      lastSeen,
   } = userInfo;


 


   return (
      <Stack
         width='full'
         justifyContent={{ xl: 'flex-start' }}
         alignItems={{
            base: 'center',
            xl: 'flex-start',
         }}
         direction={{
            base: 'column',
            xl: 'row',
         }}
         spacing={{ base: 10, xl: 40 }}
      >
         {/*  Foto de perfil */}
         <Flex w='max-content' pt={5}>
            <IconImg
               src={img}
               alt='Profile photo'
               boxSize={{
                  base: '200px',
                  lg: '250px',
                  xl: '300px',
               }}
               isRounded={true}
               bgColor='brand.50'
               border={true}
            />
         </Flex>

         {/*Info*/}
         <VStack
            w='full'
            alignItems={{
               base: 'center',
               xl: 'flex-start',
            }}
            pt={3}
            spacing={10}
            textAlign={{
               base: 'center',
               xl: 'initial',
            }}
         >
            <VStack alignItems={{base:'center', xl: 'flex-start'}}>

               <Heading> {name} </Heading>
               {
                  line && 
                  <Text color='gray.600' fontSize='sm'>
                     {line}
                  </Text>
               }
               <HStack fontSize='sm' color='gray.600' alignItems='flex-start'>
                  <Icon as={HiLocationMarker} />
                  <Text> {location} </Text>
               </HStack>
            </VStack>

            <VStack minH='80px' alignItems={{ base: 'center', xl: 'flex-start'}}
            
               maxW={{ lg: '70%'}}
            >
               <Heading fontSize='md'>
                  {kind === 'Developer'
                     ? 'Sobre mí'
                     : 'Sobre nosotros'}
               </Heading>
               <Text> {description} </Text>
            </VStack>

            {kind === 'Developer' && (
               <Button
                  borderRadius={0}
                  leftIcon={<AiOutlineDownload />}
                  variant='outline'
                  colorScheme='brandPrimary'
               >
                  Currículum
               </Button>
            )}


            <Text color='brandPrimary.500'> Última conexión: { format(lastSeen, 'es_ES') } </Text>
         </VStack>
      </Stack>
   );
};

MainInfo.propTypes = {
   userInfo: PropTypes.object,
};

export default MainInfo;
