import React, { useEffect, useState } from 'react';
import IconImg from 'components/layout/IconImg';
import { useDispatch, useSelector } from 'react-redux';
import { setIsConversationSelected, setSelectedConversation, startSendingMessage, startSettingConversationMessages, setLastMessage } from 'actions/conversations';
import {
   Flex,
   Heading,
   HStack,
   IconButton,
   Input,
   Text,
   Link as ChakraLink,
   VStack,
} from '@chakra-ui/react';
import { FiSend} from 'react-icons/fi';
import MessageItem from './MessageItem';
import { useParams } from 'react-router-dom';
import LoadingScreen from 'components/layout/LoadingScreen';
import { Link } from 'react-router-dom';


const ConversationScreen = () => {
   const dispatch = useDispatch();
   const { id: convId } = useParams();
   const { id: myId, redirect } = useSelector(state => state.auth);
   const { conversationMessages, selectedConversation, conversations } = useSelector(state => state.conversations);

   const scrollToLastMessage = () => {
      const lastMessage = document.getElementById('lastMessage');
      lastMessage?.scrollIntoView({ behavior: 'smooth'});
   }

   useEffect(() => {
      document.body.style.overflow = 'hidden'
   }, []);

   useEffect(() => {
      if(conversations.length > 0) {
         dispatch(setSelectedConversation(convId));
         dispatch(startSettingConversationMessages(convId))
      }

      dispatch(setIsConversationSelected(true));

      return () => {
         dispatch(
            setIsConversationSelected(false)
         );
      };
   }, [dispatch, convId, conversations]);

   useEffect(() => {
      if(conversationMessages.length > 0) {
         scrollToLastMessage();
         dispatch(setLastMessage());
      }
   }, [conversationMessages, dispatch])

   
   const [message, setMessage] = useState('');
   const handleSendMessage = (e) => {
      e.preventDefault();
      
      if(message.length === 0 || !message) {
         return;
      }

      console.log(message);
      setMessage('');

      dispatch(startSendingMessage({
         conversationId: convId,
         sender: myId,
         text: message
      }));
   }

   
   const member = selectedConversation?.members?.find(memb => memb.id !== myId);

   if(conversations.length === 0 || conversationMessages.length === 0 || !member) {
      return <LoadingScreen />
   }

   console.log(member)

   return (
      <VStack
         w='full'
         h={{
            base: '95vh',
            '2xl': '100vh',
         }}
         maxH={{
            base: '95vh',
            '2xl': '100vh',
         }}
         overflowY='scroll'
      >
         <HStack
            w='full'
            paddingX={{ base: 5, '2xl': 10 }}
            paddingY={3}
            alignItems='center'
            spacing={10}

            borderBottom='1px solid'
            borderColor='gray.100'

            position='sticky'
            left={0}
            top={0}
            zIndex={9}

            backgroundColor='white'
         >
            <IconImg
               src={member.img}
               alt={member.name}
               boxSize={{ base: '70px' }}
               isRounded
            />

            <VStack alignItems='flex-start' spacing={0}>
               <ChakraLink as={Link} to={`${redirect}/search/${member.id}`} isExternal>
                  <Heading fontSize='2xl'>
                     {member.name}
                  </Heading>
               </ChakraLink>

               <Text>{member.line || member.location }</Text>
            </VStack>
         </HStack>


         <VStack w='full' spacing={5} paddingY={5}>
            {
               conversationMessages.map(msg => <MessageItem key={msg.id} message={msg} />)
            }
            <div id='lastMessage'></div>
         </VStack>

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
               marginTop: 'auto'
            }}
         >
            <form style={{ width: '100%'}} onSubmit={handleSendMessage}>
               <HStack w='full'>
                  <Input 
                     placeholder='Escribe un mensaje...'
                     onChange={ (e) => setMessage(e.target.value) }
                     value={message}
                  />

                  <IconButton aria-label='Send' icon={<FiSend />} type='submit'/>
               </HStack>
            </form>
         </Flex>
      </VStack>
   );
};

ConversationScreen.propTypes = {};

export default ConversationScreen;
