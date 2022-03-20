

import React from 'react'
import PropTypes from 'prop-types'
import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import IconImg from 'components/layout/IconImg';
import { useSelector } from 'react-redux';

import { format } from 'timeago.js';
// Cambiar el idioma de timeAgo a español
import 'helpers/timeAgoRegister';


const MessageItem = ({ message }) => {
   const { sender, text, createdAt } = message;
   const { id: myId } = useSelector(state => state.auth);
   const mine = sender.id === myId;

   const borderRadius = mine ? '10px 0px 10px 10px' : '0px 10px 10px 10px';
   return (
      <Flex
         w='full'
         justifyContent={ mine ? 'flex-end' : 'flex-start'}
         paddingX={{ base: 5, xl: 10}}
      >  
         <HStack
            alignItems='flex-start'
            gap={{ base: 1, xl: 5 }}
         >
            <Flex order={ mine ? 2 : 1}>
               <IconImg 
                  src={ sender.img }
                  alt={ sender.name }
                  boxSize={{ base: '30px', xl: '45px'}}
                  isRounded
               />
            </Flex>
            
            <VStack
               order={ mine ? 1 : 2}
               alignItems={ mine ? 'flex-end' : 'flex-start'}
               paddingTop={3}
            >

               <Flex
                  direction='column'
                  backgroundColor={ mine ? 'blue.400' : 'gray.50' }
                  paddingX={3}
                  paddingY={1}
                  borderRadius={ borderRadius }
                  color={ mine && 'white' }
                  maxW={{ base: '200px', 'xl': '350px' }}

                  alignItems={ mine ? 'flex-end' : 'flex-start'}
               >
                  <Text> {text}</Text>

               </Flex>
               <Text fontSize='xs'>
                  { format(createdAt, 'es_ES') }
               </Text>
            
            </VStack>
         </HStack>
      </Flex>
   );
};

MessageItem.propTypes = {
   message: PropTypes.object
}

export default MessageItem