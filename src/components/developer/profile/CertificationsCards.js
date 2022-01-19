

import { HStack, Text, VStack, Link } from '@chakra-ui/react';
import IconImg from 'components/IconImg';
import React from 'react';
import { useSelector } from 'react-redux';
import EmptySection from './EmptySection';

const CertificationsCards = () => {
   const { certifications } = useSelector(state => state.devInfo);


   return (
      certifications.length === 0 
      ? <EmptySection />
      : (
         certifications.map(cert => {
            const { img, institution, title, year, _id } = cert;

            return (
               <HStack 
                  p={5} 
                  alignItems='center'
                  w='full'
                  spacing={8}
                  key={_id}
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
                     maxWidth='80%'
                  >
                     <Text fontWeight='black'> { title } </Text>
                     <Text> { institution }, {year} </Text>
                        
                  </VStack>

               </HStack>
            );
         })
      )

   );
};




export default CertificationsCards;
