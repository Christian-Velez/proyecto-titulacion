import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { HStack, Text } from '@chakra-ui/react';

const LinkItem = ({
   children,
   path,
   icon,
   setDisplayMenu,
   isMobile = false
}) => {


   const navigate = useNavigate();
   const location = useLocation();

   const handleNavigate = () => {
      navigate(path);

      // Cierra el menu lateral si es que esta en movil
      // Totalmente estetico, se puede quitar
      if(isMobile) {
         setDisplayMenu('none');

         // Regresa el scrollbar
         document.body.style.overflow = 'auto';
      }
   };

   const isActive = location.pathname === path;

   return (
      <HStack
         borderLeft={ isActive && '3px solid' }
         bgColor={ isActive && 'brand.400'}
         width='full'
         as='button'
         paddingY={3}
         paddingX={{ base: 10, lg: 5 }}
         style={{
            margin: 0,
            
         }}
         onClick={handleNavigate}
         _hover={{
            bgColor: 'brand.600',
         }}
         transition='background-color .3s ease'
         color='brand.100'
         alignSelf='flex-end'
      >

         { icon }
         
         <Text fontWeight='hairline' fontSize='lg'> {children} </Text>
      </HStack>
   );
};

LinkItem.propTypes = { 
   children: PropTypes.string.isRequired,
   path: PropTypes.string.isRequired,
   icon: PropTypes.element.isRequired,
   setDisplayMenu: PropTypes.func,
   isMobile: PropTypes.bool
};

export default LinkItem;
