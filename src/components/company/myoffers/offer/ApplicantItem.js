import React from 'react';
import PropTypes from 'prop-types';


// Components
import IconImg from 'components/layout/IconImg';
import { 
   Button, 
   Heading, 
   HStack, 
   Icon, 
   Link as ChakraLink, 
   Progress, 
   Text, 
   VStack 

} from '@chakra-ui/react';
import { HiLocationMarker } from 'react-icons/hi';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startAcceptingApplicant, startDiscartingApplicant } from 'actions/company/job';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { startSettingCompanyInfo } from 'actions/company/user';



const ApplicantItem = ({ applicant, rejected }) => {
   const dispatch = useDispatch();
   const { id: jobId } = useParams();



   const { img, name, location, percentage, id: devId } = applicant;
   const colorScheme =
      percentage >= 70 ?   'teal'  : 
      percentage >= 50 ?   'cyan'   :
      percentage >= 25 ?   'purple' :
                           'red';

                           

   const handleDiscard = () => {
      dispatch(startDiscartingApplicant(jobId, devId))
         .then(dispatch(startSettingCompanyInfo()));
   };

   const handleAccept = () => {
      dispatch(startAcceptingApplicant(jobId, devId));
   };


   return (
      <VStack
         w={{ base: '90%', md: '40%', lg: '28%' , '2xl': '20%'}}
         minW='300px'
         spacing={10}
         padding={10}
         boxShadow='md'
         borderRadius='lg'
      >
         <IconImg
            src={img}
            alt={name}
            boxSize={{ base: '160px' }}
            isRounded
         />

         <VStack>
            <Heading fontSize='lg'> {name} </Heading> 
            <ChakraLink as={Link} to={`/co/search/${devId}`}>
               Revisar perfil <ExternalLinkIcon mx='2px' />
            </ChakraLink>
            
            <HStack fontSize='sm' color='gray.600' alignItems='flex-start' justifyContent='center' w='full'>
               <Icon as={HiLocationMarker} />
               <Text> {location || 'Sin especificar'} </Text>
            </HStack>
         </VStack>

         


         
         {
            !rejected && 
            <>
               <VStack w='full'>
                  <Text> Requerimientos ({percentage || 0} %)</Text>
                  <Progress value={percentage} w='80%' size='xs' colorScheme={colorScheme} />
               </VStack>

               <HStack>
                  <Button variant='outline' onClick={ handleDiscard }>Descartar</Button>
                  <Button colorScheme='brandPrimaryPurple' onClick={ handleAccept }>Aceptar</Button>
               </HStack>
            </>
         }
      </VStack>
   );
};

ApplicantItem.propTypes = {
   applicant: PropTypes.object,
   rejected: PropTypes.bool
};

export default ApplicantItem;
