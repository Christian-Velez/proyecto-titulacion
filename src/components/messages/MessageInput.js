import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Flex, HStack, IconButton, Input } from '@chakra-ui/react';
import { FiSend} from 'react-icons/fi';

const MessageInput = ({ sendMessage }) => {
   const [message, setMessage] = useState('');


   const handleSubmit = (e) => {
      e.preventDefault();
      sendMessage(message);
      setMessage('');
   }

   return (
      <Flex
         width='100%'
         padding={5}
         justifyContent='flex-start'
         backgroundColor='white'
         position='sticky'
         left={0}
         bottom={0}
         zIndex={9}
         style={{
            marginTop: 'auto',
         }}
      >
         <form
            style={{ width: '100%' }}
            onSubmit={handleSubmit}
         >
            <HStack w='full'>
               <Input
                  placeholder='Escribe un mensaje...'
                  onChange={(e) =>
                     setMessage(e.target.value)
                  }
                  value={message}
               />

               <IconButton
                  aria-label='Send'
                  icon={<FiSend />}
                  type='submit'
               />
            </HStack>
         </form>
      </Flex>
   );
};

MessageInput.propTypes = {
   sendMessage: PropTypes.func,
};

export default MessageInput;
