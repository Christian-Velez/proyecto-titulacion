import React, {
   useEffect
} from 'react';
import {
   Divider,
   Flex,
   Heading,
   HStack,
   IconButton,
   Text,
   useDisclosure,
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
import { setSocket, startLoadingConversations } from 'actions/conversations';
import ConversationItem from './ConversationItem';
import ChatConfigModal from './ChatConfigModal';
import { toastInfo } from 'helpers/ToastAlert';
import { io } from 'socket.io-client';


const SOCKET_URL = 'https://devconnect-socket.herokuapp.com/';

const ChatScreen = () => {
   const dispatch = useDispatch();
   const { isOpen, onOpen, onClose } = useDisclosure();
   const { isConversationSelected, conversations, socket } = useSelector(state => state.conversations);
   const { role, id } = useSelector(state => state.auth);
   const { defaultMessages = {} } = useSelector(state => state.companyInfo);

   useEffect(() => {
      socket?.emit('addUser', id);
      socket?.on("getUsers", users => {
      })

   }, [ id, socket, dispatch ]);

   useEffect(() => {
      dispatch(startLoadingConversations());
      dispatch(setSocket(io(SOCKET_URL)));
      
   }, [ dispatch ]);

   useEffect(() => {
      const isEmpty = Object.keys(defaultMessages).length === 0;
      if(role === 'Company' && isEmpty) {
         toastInfo('No te olvides de configurar tus mensajes predeterminados! ⚙️');
      }
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <>
         { role === 'Company' &&  <ChatConfigModal isOpen={isOpen} onClose={onClose}/> } 
         <HStack
            maxH='100vh'
            w='full'
            spacing={0}
            alignItems='flex-start'
            style={{
               margin: 0,
            }}

            overflowY='hidden'
         >
            {/* Barra lateral */}
            <VStack
               alignItems='flex-start'
               className='animate__animated animate__fadeIn animate__faster'
               display={{
                  base:
                     isConversationSelected &&
                     'none',
                  'xl': 'flex',
               }}
               maxH={{ 'xl': '100vh' }}
               minH='100vh'
               overflowY='scroll'
               padding={0}
               spacing={5}
               w={{ base: 'full', 'xl': '30%' }}
               maxW={{ 'xl': '350px' }}
               
            >
               <HStack
                  w='full'
                  justifyContent='space-between'
                  padding={7}
               >
                  <Heading fontSize='3xl'>
                     Mensajes
                  </Heading>

                  {
                     role === 'Company' && 
                     <IconButton
                        aria-label='Configuracion'
                        icon={<SettingsIcon />}
                        onClick={ onOpen }
                        variant='ghost'
                     />

                  }
               </HStack>

               <Divider />

               <VStack w='full' spacing={0}>
                  {
                     conversations.length === 0
                        ? <Text>Aún no has iniciado ninguna conversación</Text>
                        : conversations.map((conv) => <ConversationItem key={conv.id} conversation={conv} />)
                  }
               </VStack>
            </VStack>

            {/* Conversacion */}
            <Flex
               display={{
                  base:
                     !isConversationSelected &&
                     'none',
                  'xl': 'flex',
               }}
               maxH={{ 'xl': '100vh' }}
               w={{ base: 'full', 'xl': ' 81%' }}
               justifyContent='center'
            >
               {/* Componente => JobScreen
                  
                  Movil -> Lo muestra en una pantalla completa, w = full
                  PC -> Lo muestra a la derecha en una seccion, w = 25%
               
               */}

               <Outlet />
            
            </Flex>
         </HStack>
      </>

   );
};

export default ChatScreen;
