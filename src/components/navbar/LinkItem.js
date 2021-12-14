import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { HStack, Text } from '@chakra-ui/react';

const LinkItem = ({
   children,
   path,
   icon
}) => {


   const navigate = useNavigate();
   const location = useLocation();

   const handleNavigate = () => {
      navigate(path);
   };

   const isActive = location.pathname === path;

   return (
      <HStack
         color={ 'brand.100'}
         borderLeft={ isActive && '3px solid' }
         bgColor={ isActive && 'brand.400'}
         width='full'
         as='button'
         paddingY={3}
         paddingX={5}
         style={{
            margin: 0
         }}
         onClick={handleNavigate}
         _hover={{
            bgColor: 'brand.600',
         }}
         transition='background-color .3s ease'
      >

         { icon }
         
         <Text fontWeight='hairline' fontSize='lg'> {children} </Text>
      </HStack>
   )
}

export default LinkItem
