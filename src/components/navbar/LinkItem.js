import { CheckCircleIcon } from '@chakra-ui/icons';
import { HStack, Text } from '@chakra-ui/react';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const LinkItem = ({
   children,
   path,
}) => {
   const navigate = useNavigate();
   const location = useLocation();

   const handleNavigate = () => {
      navigate(path);
   };

   const isActive = location.pathname === path;

   return (
      <HStack
         color='purple.100'
         bgColor={ isActive && 'purple.400'}
         width='full'
         as='button'
         paddingY={3}
         paddingX={5}
         style={{
            margin: 0
         }}
         onClick={handleNavigate}
         _hover={{
            bgColor: 'purple.600',
         }}
         transition='background-color .3s ease'
      >
         <CheckCircleIcon />
         <Text fontWeight='hairline'> {children} </Text>
      </HStack>
   )
}

export default LinkItem
