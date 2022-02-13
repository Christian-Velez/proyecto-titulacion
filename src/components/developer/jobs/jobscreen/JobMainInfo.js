import React from 'react';
import PropTypes from 'prop-types';
import {
   Button,
   Heading,
   HStack,
   Text,
   VStack,
   Link as ChakraLink
} from '@chakra-ui/react';
import IconImg from 'components/layout/IconImg';
import { format } from 'timeago.js';


// Cambiar el idioma de timeAgo a español
import 'helpers/timeAgoRegister';
import { useDispatch, useSelector } from 'react-redux';
import { startApplyingProcess } from 'actions/developer/jobs';

const JobMainInfo = ({jobInfo}) => {
   const { loading } = useSelector(state => state.ui);

   const dispatch = useDispatch();
   const { id: userId } = useSelector(state => state.auth);
   const { id, title, company, created_at, salary, applicants } = jobInfo;
   const { img, name, location, id: companyId } = company;



   const alreadyApply = applicants.includes(userId);

   const handleApply = async () => {
      dispatch(startApplyingProcess(id, alreadyApply));
   };

   return (
      <VStack
         w='full'
         textAlign='center'
         spacing={10}
      >
         {/*Imagen de la empresa */}
         <IconImg
            src={img}
            alt={name}
            boxSize={{ base: '200px'}}
            isRounded
         />

         {/*Titulo, localizacion, publicado*/}
         <VStack w='full'>
            <Heading
               fontSize={{
                  base: '2xl',
                  lg: '3xl',
               }}
            >
               {title}
            </Heading>
            <Text>
               <ChakraLink 
                  href={ `/dev/search/${companyId}` }
                  isExternal
                  color='brandPrimary.500'
               >{ name }</ChakraLink>
               
               { ` > ${location}` }
            </Text>
            <Text color='gray.500'>{ format(created_at, 'es_ES') } </Text> 
         </VStack>

         <HStack
            w='full'
            justifyContent='space-around'
         >
            <VStack>
               <Heading fontSize='md'>Sueldo/m</Heading>
               <Text>$ {salary}</Text>
            </VStack>

            <VStack>
               <Heading fontSize='md'>Tipo</Heading>
               <Text>Remoto</Text>
            </VStack>
         </HStack>

         <Button 
            w={{ base: 'full' }}
            isLoading={ loading }
            onClick={ handleApply }
            variant={ alreadyApply ? 'outline' : 'solid'}
         >
            {
               alreadyApply
                  ? 'Cancelar postulación'
                  : 'Postularse'
            }
         </Button>
      </VStack>
   );
};

JobMainInfo.propTypes = {
   jobInfo: PropTypes.object,
};

export default JobMainInfo;
