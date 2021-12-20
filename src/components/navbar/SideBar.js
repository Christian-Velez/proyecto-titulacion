
import {
   Flex,
   useBreakpoint,
} from '@chakra-ui/react';
import React, {
   useEffect,
   useState,
} from 'react';
import MobileHidden from './MobileHidden';
import MobileNavBar from './MobileNavBar';
import ComputerNavbar from './ComputerNavbar';
import manageLinks from './manageLinks';
import { useSelector } from 'react-redux';

//Componente general utilizado para renderizar el menu de navegacion de la app
const SideBar = () => {
   const [displayMenu, setDisplayMenu] = useState('none');


   const { role } = useSelector(state => state.auth);

   let userLinks;
   if(role === 'Admin') {
      userLinks = manageLinks.Admin;
   }
   if(role === 'Developer') {
      userLinks = manageLinks.Developer;
   }
   if(role === 'Company') {
      userLinks = manageLinks.Company;
   }



   // Esta parte del codigo cierra el menu flotante si se
   // hace un resize de la ventana (situacion posible solo en pc, pero por si a caso)

   // No es necesario y se puede quitar, solo es estetico
   const lgBreakpoint = useBreakpoint();
   useEffect(() => {
      if (
         lgBreakpoint === 'lg' ||
         lgBreakpoint === 'xl' ||
         lgBreakpoint === '2xl'
      ) {
         setDisplayMenu('none');
      }
   }, [lgBreakpoint]);



   return (
      <Flex
         position='sticky'
         w={{ base: 'full', lg: 'auto' }}
         left={0}
         top={0}
         zIndex={999999}
         backgroundColor='brand.500'
      >
         {/*Se muestra en movil*/}
         <MobileNavBar setDisplayMenu={setDisplayMenu} />

         {/*Menu oculto, disponible en movil*/}
         <MobileHidden  userLinks={userLinks} displayMenu={displayMenu} setDisplayMenu={setDisplayMenu}/>

         {/*Se muestra en pc*/}
         <ComputerNavbar userLinks={userLinks}/>
      </Flex>
   );
};

export default SideBar;