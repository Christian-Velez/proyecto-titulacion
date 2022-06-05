import React from 'react';
import PropTypes from 'prop-types';
import {
   Box,
   Heading,
   HStack,
   Image,
   Text,
   VStack,
} from '@chakra-ui/react';
import { format } from 'timeago.js';
// Cambiar el idioma de timeAgo a español
import 'helpers/timeAgoRegister';

const JobItem = ({ job }) => {
   const { company, created_at, title } = job;
   const { name, img } = company;

   return (
      <HStack
         alignItems='flex-start'
         w={{ base: 'full', 'xl': '45%','2xl': '40%' }}
         gap={10}
         h='min-content'
      >
         <Box boxSize='80px'>
            <Image src={img}/>
         </Box>

         <VStack
            alignItems='flex-start'
            w='70%'
         >
            <HStack spacing={10} w='full' justifyContent='space-between'>
               <Heading fontSize='sm'>
                  {name}
               </Heading>
               <Text color='gray.600' fontSize='sm'>
                  {format(created_at, 'es_ES')}
               </Text>
            </HStack>


            <Heading fontSize='xl'> {title} </Heading>
         </VStack>
      </HStack>
   );
};

JobItem.propTypes = {
   job: PropTypes.object,
};

export default JobItem;
