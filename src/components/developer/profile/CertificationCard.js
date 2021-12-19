

import { HStack, Text, VStack, Link } from '@chakra-ui/react';
import IconImg from 'components/IconImg';
import React from 'react';
import PropTypes from 'prop-types';

const CertificationCard = ({ certification }) => {
   const { img, institution, title, year } = certification;


   return (
      <HStack 
         p={5} 
         alignItems='center'
         w='full'
         spacing={8}
      >
         <Link target='_blank' href={ img} >
            <IconImg
               src={ img }
               boxSize={{ 
                  base: '80px',
                  lg: '100px'
               }}
               alt={ title }
            />
         </Link>

         <VStack
            alignItems='flex-start'
         >
            <Text fontWeight='black'> { title } </Text>
            <Text> { institution }, {year} </Text>
               
         </VStack>

      </HStack>
   );
};



CertificationCard.propTypes = {
   certification: PropTypes.object
};

export default CertificationCard;
