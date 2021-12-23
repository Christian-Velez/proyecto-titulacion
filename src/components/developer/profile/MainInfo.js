import { Button, Flex, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import IconImg from 'components/IconImg';
import React from 'react';
import { AiOutlineDownload } from 'react-icons/ai';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';






const MainInfo = () => {
   
   const { name, location, description, img } = useSelector(
      (state) => state.devInfo
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
      <Flex w='max-content'  pt={5} >
         <IconImg
            src={ img }
            alt='Profile photo'
            boxSize={{
               base: '200px',
               lg: '250px',
               xl: '300px',
               
            }}
            isRounded={true}
            bgColor='brand.50'
         />
      </Flex>

      <VStack
         w='full'
         alignItems={{
            base: 'center',
            xl: 'flex-start',
         }}
         pt={3}
         spacing={5}
         textAlign={{
            base: 'center',
            xl: 'initial',
         }}
      >
         <Heading> {name} </Heading>
         <Text
            fontSize='lg'
            color='gray.400'
         >
            {location}
         </Text>

         <Text> Sobre mi </Text>

         <Flex w='full' minH='80px' >
            <Text> { description } </Text>
         </Flex>

         <Button
            borderRadius={0}
            leftIcon={<AiOutlineDownload />}
            variant='outline'
         >
            Currículum
         </Button>
      </VStack>
   </Stack>

   );
};

MainInfo.propTypes = {
   name: PropTypes.string,
   location: PropTypes.string
};




export default MainInfo;
