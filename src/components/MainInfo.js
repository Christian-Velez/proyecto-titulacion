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
import { format, register } from 'timeago.js';
import PropTypes from 'prop-types';
import { HiLocationMarker} from 'react-icons/hi';

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


   // Cambiar el idioma de timeAgo a español
   register(
      'es_ES',
      (number, index,) =>
         [
            ['justo ahora', 'ahora mismo'],
            [
               'hace %s segundos',
               'en %s segundos',
            ],
            ['hace 1 minuto', 'en 1 minuto'],
            ['hace %s minutos', 'en %s minutos'],
            ['hace 1 hora', 'en 1 hora'],
            ['hace %s horas', 'in %s horas'],
            ['hace 1 dia', 'en 1 dia'],
            ['hace %s dias', 'en %s dias'],
            ['hace 1 semana', 'en 1 semana'],
            ['hace %s semanas', 'en %s semanas'],
            ['1 mes', 'en 1 mes'],
            ['hace %s meses', 'en %s meses'],
            ['hace 1 año', 'en 1 año'],
            ['hace %s años', 'en %s años'],
         ][index]
   );


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
                  <Text color='gray.500'>
                     {line}
                  </Text>
               }
               <HStack fontSize='sm' color='gray.500'>
                  <Icon as={HiLocationMarker} />
                  <Text> {location} </Text>
               </HStack>
            </VStack>

            <VStack minH='80px' alignItems={{ base: 'center', xl: 'flex-start'}}>
               <Text>
                  {kind === 'Developer'
                     ? 'Sobre mi'
                     : 'Sobre nosotros'}
               </Text>
               <Text> {description} </Text>
            </VStack>

            {kind === 'Developer' && (
               <Button
                  borderRadius={0}
                  leftIcon={<AiOutlineDownload />}
                  variant='outline'
               >
                  Currículum
               </Button>
            )}


            <Text color='brand.400'> Última conexión: { format(lastSeen, 'es_ES') } </Text>
         </VStack>
      </Stack>
   );
};

MainInfo.propTypes = {
   userInfo: PropTypes.object,
};

export default MainInfo;
