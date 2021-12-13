import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
   Flex,
   HStack,
   IconButton,
   Text,
   useBreakpoint,
   VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const SideBar = () => {

   const [displayMenu, setDisplayMenu] = useState('none');


   // Esta parte del codigo cierra el menu flotante si se 
   // hace un resize de la ventana (situacion posible solo en pc, pero por si a caso)

   // No es necesario y se puede quitar
   const lgBreakpoint = useBreakpoint();
   useEffect(() => {
      if(lgBreakpoint === 'lg' || lgBreakpoint ==='xl' || lgBreakpoint === '2xl') {
         setDisplayMenu('none');
      }
   }, [lgBreakpoint])
   

   return (
      <Flex
         position='sticky'
         w={{ base: 'full', lg: 'auto' }}
         left={0}
         top={0}
         zIndex={999999}
         backgroundColor='purple.500'

      >
         {/*Se muestra en movil*/}
         <HStack
            w='100%'
            display={{ base: 'flex', lg: 'none' }}
            justify='flex-end'
            p={1}
         >
            <IconButton
               aria-label='Open Menu'
               icon={<HamburgerIcon />}
               size='lg'
               onClick = { ()=> { setDisplayMenu('flex') }}
            />
         </HStack>


         <VStack
            w='100vw'
            bgColor='purple.500'
            zIndex={9999999}
            h='100vh'
            pos='fixed'
            p={1}
            paddingLeft={10}
            top='0'
            left='0'
            overflowY='auto'
            display={displayMenu}
            alignItems='flex-start'
            color='white'
         >
            <Flex
               width='full'
               justifyContent='flex-end'
            >
               <IconButton 
                  aria-label='Close Menu'
                  icon={
                     <CloseIcon />
                  }
                  onClick = { ()=> { setDisplayMenu('none') }}
               />
            </Flex>
               <Text> Si </Text>
               <Text> Si </Text>

               <Text> Si </Text>
               <Text> Si </Text>
               <Text> Si </Text>
               <Text> Si </Text>
         


         </VStack>





         {/*Se muestra en pc*/}
         <VStack
            h='100vh'
            w='200px'
            display={{ base: 'none', lg: 'flex' }}
         >
            <Text color='red'> Yo </Text>
         </VStack>
      </Flex>
   );
};

export default SideBar;
