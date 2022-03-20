import React, {
   useEffect,
} from 'react';
import {
   Divider,
   Flex,
   Heading,
   HStack,
   IconButton,
   VStack,
} from '@chakra-ui/react';
import {
   Outlet,
} from 'react-router-dom';
import {
   useDispatch,
   useSelector,
} from 'react-redux';
import { SettingsIcon } from '@chakra-ui/icons';
import { startLoadingConversations } from 'actions/conversations';
import ConversationItem from './ConversationItem';

const ChatScreen = () => {
   const dispatch = useDispatch();
   const { isConversationSelected, conversations } = useSelector(state => state.conversations);

   useEffect(() => {
      dispatch(startLoadingConversations());
   }, [dispatch]);
  
   return (
      <HStack
         //minH='100vh'
         w='full'
         spacing={0}
         alignItems='flex-start'
         style={{
            margin: 0,
         }}

         overflowY='unset'
      >
         {/* Barra lateral */}
         <VStack
            alignItems='flex-start'
            className='animate__animated animate__fadeIn animate__faster'
            display={{
               base:
                  isConversationSelected &&
                  'none',
               '2xl': 'flex',
            }}
            maxH={{ '2xl': '100vh' }}
            minH='100vh'
            overflowY={{ '2xl': 'scroll' }}
            padding={0}
            spacing={5}
            w={{ base: 'full', '2xl': '30%' }}
            maxW={{ '2xl': '350px' }}
         >
            <HStack
               w='full'
               justifyContent='space-between'
               padding={7}
            >
               <Heading fontSize='3xl'>
                  Mensajes
               </Heading>
               <IconButton
                  aria-label='Configuracion'
                  icon={<SettingsIcon />}
                  variant='ghost'
               />
            </HStack>

            <Divider />

            <VStack w='full' spacing={0}>
               {
                  conversations.map((conv) => <ConversationItem key={conv.id} conversation={conv} />)
               }
            </VStack>
         </VStack>

         {/* Conversacion */}
         <Flex
            display={{
               base:
                  !isConversationSelected &&
                  'none',
               '2xl': 'flex',
            }}
            maxH={{ '2xl': '100vh' }}
            w={{ base: 'full', '2xl': ' 81%' }}
            justifyContent='center'
         >
            {/* Componente => JobScreen
               
               Movil -> Lo muestra en una pantalla completa, w = full
               PC -> Lo muestra a la derecha en una seccion, w = 25%
            
            */}

            <Outlet />
           
         </Flex>
      </HStack>
   );
};

export default ChatScreen;
