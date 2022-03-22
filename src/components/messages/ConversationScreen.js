import React, { useEffect, useMemo, useState } from 'react';
import IconImg from 'components/layout/IconImg';
import { useDispatch, useSelector } from 'react-redux';
import { setIsConversationSelected, setSelectedConversation, startSendingMessage, startSettingConversationMessages, setLastMessage } from 'actions/conversations';
import {
   Heading,
   HStack,
   Text,
   Link as ChakraLink,
   VStack,
   useDisclosure,
} from '@chakra-ui/react';
import MessageItem from './MessageItem';
import { useParams } from 'react-router-dom';
import LoadingScreen from 'components/layout/LoadingScreen';
import { Link } from 'react-router-dom';
import MessageInput from './MessageInput';
import BlockedModal from './BlockedModal';


const ConversationScreen = () => {
   const dispatch = useDispatch();
   const { isOpen, onOpen, onClose } = useDisclosure()
   const { id: convId } = useParams();
   const { id: myId, redirect } = useSelector(state => state.auth);
   const { conversationMessages, selectedConversation, conversations } = useSelector(state => state.conversations);
   const [isLoading, setIsLoading] = useState(false);
   
   const scrollToLastMessage = () => {
      const lastMessage = document.getElementById('lastMessage');
      lastMessage?.scrollIntoView({ behavior: 'smooth'});
   }
   useEffect(() => {
      document.body.style.overflow = 'hidden';

      return () => {
         document.body.style.overflow = 'auto';
      }
   }, []);

   useEffect(() => {

      const loadConversation = async () => {
         setIsLoading(true);
         if(conversations.length > 0) {
            await dispatch(setSelectedConversation(convId));
            await dispatch(startSettingConversationMessages(convId))
         }
         setIsLoading(false);
      }

      loadConversation();
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

   const handleSendMessage = (message) => {
      if(message.length === 0 || !message) {
         return;
      }

      dispatch(startSendingMessage({
         conversationId: convId,
         sender: myId,
         text: message
      }));
   }

   
   const member = 
      useMemo(() => selectedConversation?.members?.find(memb => memb.id !== myId), [selectedConversation, myId]);
   
   const { blocked } = selectedConversation;

   if(conversations.length === 0 || conversationMessages.length === 0 || !member) {
      return <LoadingScreen />;
   }

   return (
      <>
         { blocked && <BlockedModal isOpen={isOpen} onClose={onClose} /> }
         <VStack
            w='full'
            h='100vh'
            maxH='100vh'
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


            {  
               isLoading
                  ? <LoadingScreen />
                  :
                     <VStack w='full' spacing={5} paddingY={5}>
                        {
                           conversationMessages.map(msg => <MessageItem key={msg.id} message={msg} />)
                        }
                        <div id='lastMessage'></div>

                        {
                           blocked && 
                           <HStack w='full' justifyContent='center'>
                              <Text> No puedes responder a esta conversación. 
                                 <ChakraLink textDecor='underline' onClick={ onOpen }> Más información</ChakraLink> 
                              </Text>
                           </HStack>
                        }
                     </VStack>
            }

            {
               !blocked && <MessageInput sendMessage={handleSendMessage}/>
            }
            
         </VStack>
      </>
   );
};

ConversationScreen.propTypes = {};

export default ConversationScreen;
