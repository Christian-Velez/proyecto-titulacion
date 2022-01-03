
import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import IconImg from 'components/IconImg';

const TechnologyMainInfo = ({technology}) => {
   const { img, name, type } = technology;

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
         <Flex w='max-content'  pt={5} >
            <IconImg
               src={ img }
               alt='Profile photo'
               boxSize={{
                  base: '200px',
                  lg: '250px',
                  xl: '250px',
                  
               }}
            />
         </Flex>


         {/*Info*/}
         <VStack
            w={{ base: 'full', xl: '60%'}}
            alignItems={{
               base: 'center',
               xl: 'flex-start',
            }}
            pt={{ base:  0, lg: 10 }}
            spacing={0}
            textAlign={{
               base: 'center',
               xl: 'initial',
            }}            
         >
            <Heading fontSize={{ base: '2xl', lg: '4xl'}}> {name} </Heading>
            <Text> { type } </Text>
         </VStack>
      </Stack>
   );
};

TechnologyMainInfo.propTypes = {
   technology: PropTypes.object
};

export default TechnologyMainInfo;
