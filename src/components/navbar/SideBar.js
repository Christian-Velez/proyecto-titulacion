
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



   // Cierra el menu flotante si esta abierto y se pasa a resolucion LG
   const lgBreakpoint = useBreakpoint();
   useEffect(() => {
      if (
         lgBreakpoint === 'lg' ||
         lgBreakpoint === 'xl' ||
         lgBreakpoint === '2xl'
      ) {
         // Cierra el menu y regresar el scrollbar
         setDisplayMenu('none');
         document.body.style.overflow = 'auto';

      }
   }, [lgBreakpoint]);


   // Componente que muestra la imagen y el nombre 
   const [userInfo, setUserInfo] = useState({});
   const devInfo = useSelector(state => state.devInfo);
   const companyInfo = useSelector(state => state.companyInfo);


   useEffect(() => {
      if(role === 'Developer') {
         const { name, img, kind } = devInfo;
         setUserInfo({
            name,
            img,
            kind
         });
      }
      else if(role === 'Company') {
         const { name, img, kind } = companyInfo;
         setUserInfo({
            name,
            img,
            kind
         });
      }
   }, [companyInfo, devInfo]);



   return (
      <Flex
         position='sticky'
         w={{ base: 'full', lg: 'auto' }}
         left={0}
         top={0}
         zIndex={999999}
         backgroundColor='brand.600'
      >  
         {/*Se muestra en movil*/}
         <MobileNavBar
            setDisplayMenu={setDisplayMenu}
         />

         {/*Menu oculto, disponible en movil*/}
         <MobileHidden
            userLinks={userLinks}
            userInfo={userInfo}
            displayMenu={displayMenu}
            setDisplayMenu={setDisplayMenu}
         />

         {/*Se muestra en pc*/}
         <ComputerNavbar
            userLinks={userLinks}
            userInfo={userInfo}
         />
      </Flex>
   );
};

export default SideBar;
