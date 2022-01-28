import React from 'react';
import PropTypes from 'prop-types';
import {
   Button,
   Heading,
   Text,
   VStack,
} from '@chakra-ui/react';
import IconImg from 'components/IconImg';

const JobItem = ({ job }) => {
   const { title, company, description } = job;
   const { img, name } = company;

   return (
      <VStack
         w='full'
         alignItems='flex-start'
         paddingY={10}
         paddingX={{ base: 5, lg: 10}}
         border='1px solid'
         borderColor='gray.100'
         borderRadius='lg'

      >
         <IconImg 
            alt={name}
            src={img}
            boxSize={{ base: '100px'}}
            isRounded
         />

            <Heading
               fontSize={{ base: 'xl', lg: '2xl' }}
            >
               {title}
            </Heading>

            <Text> { name }   </Text>

            <VStack w='full' alignItems='flex-start'>
               <Text fontWeight='bold'> Descripción </Text>]
               <Text> { description } </Text>
            </VStack>


            <Button variant='outline'>Cancelar postulación</Button>
      </VStack>
   );
};

JobItem.propTypes = {
   job: PropTypes.object,
};

export default JobItem;
