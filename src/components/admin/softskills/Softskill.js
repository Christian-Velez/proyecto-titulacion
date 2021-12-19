
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { HStack, VStack, Text } from '@chakra-ui/react';
import IconImg from 'components/IconImg';





const Softskill = ({ info }) => {
   const { id, img, name } = info;
   const navigate = useNavigate();

   const handleEdit = () => {
      navigate(`/admin/soft-skills/edit/${id}`);
   };

   return (
      <HStack
         w='full'
         spacing={5}
         border='1px'
         alignItems='flex-start'
         padding={{ base: 2, lg: 5 }}
         borderRadius='md'
         borderColor='gray.200'
         _hover={{
            cursor: 'pointer',
            bgColor: 'gray.50',
         }}
         transition='background-color .3s ease'

         onClick={ handleEdit }
      >
         <IconImg src={img} alt={name} boxSize={{ base: '90px', lg: '120px'}}/>

         <VStack alignItems='flex-start'
            width={{ base: '80%', lg: '92%'}}
            spacing={0}
         >
            <Text fontWeight='bold'> { name } </Text>
         </VStack>
      </HStack>
   );
};

Softskill.propTypes = {
   info: PropTypes.object,
};

export default Softskill;
