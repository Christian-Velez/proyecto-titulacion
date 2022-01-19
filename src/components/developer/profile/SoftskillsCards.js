import React from 'react';
import PropTypes from 'prop-types';
import { Heading, HStack, VStack } from '@chakra-ui/react';
import IconImg from 'components/IconImg';
import { useSelector } from 'react-redux';
import EmptySection from './EmptySection';



const SoftskillsCards = () => {
   const { 
      softskills 
   } = useSelector(state => state.devInfo);

   
   return (
      softskills.legth === 0
      ? <EmptySection />
      : (
         softskills.map(soft => {
            const { img, name, id } = soft;

            return (
               <HStack 
                  p={5} 
                  alignItems='center'
                  w='full'
                  spacing={8}
                  key={ id }
               >
                  <IconImg
                     src={ img }
                     boxSize={{ 
                        base: '80px',
                        lg: '100px'
                     }}
                     alt={ name }
                  />

                  <VStack
                     alignItems='flex-start'
                     maxWidth='50%'
                  >
                     <Heading fontSize={{ base: 'md', '2xl': 'lg'}} fontWeight='semibold'>{ name }</Heading>
                  </VStack>
               </HStack>
            );
         })
      )
   );
};

SoftskillsCards.propTypes = {
   soft: PropTypes.object
};


export default SoftskillsCards;
