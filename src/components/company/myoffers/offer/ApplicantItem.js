import React from 'react';
import PropTypes from 'prop-types';


// Components
import IconImg from 'components/IconImg';
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
import { Link } from 'react-router-dom';



const ApplicantItem = ({ applicant }) => {
   const { img, name, location, percentage, id } = applicant;

   const colorScheme =
      percentage >= 70 ?   'teal'  : 
      percentage >= 50 ?   'cyan'   :
      percentage >= 25 ?   'purple' :
                           'red';

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
            <ChakraLink as={Link} to={`/co/search/${id}`}> 
               <Heading fontSize='lg'> {name} </Heading> 
            </ChakraLink>

            <HStack fontSize='sm' color='gray.600' alignItems='flex-start' justifyContent='center' w='full'>
               <Icon as={HiLocationMarker} />
               <Text> {location || 'Sin especificar'} </Text>
            </HStack>
         </VStack>

         <VStack w='full'>
            <Text> Requerimientos ({percentage} %)</Text>
            <Progress value={percentage} w='80%' size='xs' colorScheme={colorScheme} />
         </VStack>


         

         <HStack>
            <Button variant='outline'>Descartar</Button>
            <Button colorScheme='brandPrimaryPurple'>Aceptar</Button>
         </HStack>
      </VStack>
   );
};

ApplicantItem.propTypes = {
   applicant: PropTypes.object,
};

export default ApplicantItem;