import React from 'react';
import PropTypes from 'prop-types';
import {
   Button,
   Heading,
   HStack,
   Text,
   VStack,
} from '@chakra-ui/react';
import IconImg from 'components/IconImg';

// Cambiar el idioma de timeAgo a español
import 'helpers/timeAgoRegister';
import { format } from 'timeago.js';
import { useDispatch } from 'react-redux';
import { startApplyingProcess } from 'actions/developer/jobs';

const JobItem = ({ job }) => {
   const { title, company, description, id } = job;
   const { img, name, lastSeen } = company;


   const dispatch = useDispatch();

   const handleCancelApply = () => {
      const alreadyApply = true;
      dispatch(startApplyingProcess(id, alreadyApply));
   };

   return (
      <HStack
         w='full'
         direction={{ base: 'column', lg: 'row'}}
         alignItems='flex-start'
         paddingY={10}
         paddingX={{ base: 5, lg: 10}}
         border='1px solid'
         borderColor='gray.100'
         borderRadius='lg'
         spacing={10}
      >
         <IconImg 
            alt={name}
            src={img}
            boxSize={{ base: '100px'}}
            isRounded
         />

         <VStack maxW='80%' alignItems='flex-start' spacing={5}>

            <VStack alignItems='flex-start'>
               <Heading
                  fontSize={{ base: 'xl', lg: '2xl' }}
               >
                  {title}
               </Heading>

               <Text> { name } </Text>
               <Text color='brandGray'>  última conexión: { format(lastSeen, 'es_ES') } </Text>
            </VStack>
           
            <VStack alignItems='flex-start'>
               <Text fontWeight='bold'> Descripción </Text>]
               <Text> { description } </Text>
            </VStack>

            <Button variant='outline' onClick={ handleCancelApply }>Cancelar postulación</Button>
         </VStack>
      </HStack>
   );
};

JobItem.propTypes = {
   job: PropTypes.object,
};

export default JobItem;
