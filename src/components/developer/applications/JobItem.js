import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';


// Components
import IconImg from 'components/IconImg';
import { AiFillClockCircle } from 'react-icons/ai';
import { RiBuilding2Fill } from 'react-icons/ri';
import {
   Button,
   Heading,
   HStack,
   Stack,
   Text,
   VStack,
   Link as ChakraLink,
   Icon
} from '@chakra-ui/react';


import { startApplyingProcess } from 'actions/developer/jobs';

// Cambiar el idioma de timeAgo a español
import { format } from 'timeago.js';
import 'helpers/timeAgoRegister';

const JobItem = ({ job }) => {
   const { title, company, description, id } = job;
   const { img, name, lastSeen } = company;


   const dispatch = useDispatch();

   const handleCancelApply = () => {
      const alreadyApply = true;
      dispatch(startApplyingProcess(id, alreadyApply));
   };

   return (
      <Stack
         w='full'
         direction={{ base: 'column', lg: 'row'}}
         alignItems={{ base: 'center', lg: 'flex-start' }}
         border='1px solid'
         borderColor='gray.100'
         borderRadius='lg'
         spacing={10}
         paddingY={10}
         paddingX={{ base: 5, lg: 10}}

         textAlign={{ base:'center', lg: 'initial'}}
      >
         <IconImg 
            alt={name}
            src={img}
            boxSize={{ base: '130px'}}
            isRounded
         />

         <VStack 
            w={{ base: 'full', lg:'80%'}} 
            alignItems={{ base: 'center', lg: 'flex-start'}}
            spacing={{ base: 10, lg: 5}}
         >
            <Heading
                  fontSize='2xl'
               >
                  {title}
            </Heading>

            <Stack
               justifyContent='center'
               color='brandGray'
               spacing={{ base: 3, lg: 5}}
               direction={{ base: 'column', lg: 'row'}}
            >
               
               <ChakraLink 
                  href='https://chakra-ui.com' 
                  isExternal 
               >
                  <Icon as={RiBuilding2Fill} /> { name }  
               </ChakraLink>
               
               <HStack>
                  <AiFillClockCircle />
                  <Text>activo { format(lastSeen, 'es_ES') } </Text>
               </HStack>
            </Stack>
           
            <VStack
               alignItems={{ base: 'center', lg: 'flex-start'}}
               maxW={{ lg: '80%'}}
            >
               <Heading fontSize='md'>Descripción</Heading>
               <Text> { description } </Text>
            </VStack>

            <Button variant='outline' onClick={ handleCancelApply }>Cancelar postulación</Button>
         </VStack>

      </Stack>
   );
};

JobItem.propTypes = {
   job: PropTypes.object,
};

export default JobItem;
