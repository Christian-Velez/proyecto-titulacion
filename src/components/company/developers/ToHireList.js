import React from 'react';
import IconImg from 'components/layout/IconImg';
import ItemWrapper from './ItemWrapper';
import { Link } from 'react-router-dom';
import { startDiscartingApplicant, startHiringDeveloper } from 'actions/company/user';
import {
   Heading,
   Text,
   VStack,
   Link as ChakraLink,
   HStack,
   Button,
   Badge,
} from '@chakra-ui/react';
import {
   useDispatch,
   useSelector,
} from 'react-redux';

const ToHireList = () => {
   const dispatch = useDispatch();
   const { toHire, employees } = useSelector((state) => state.companyInfo);

   const handleDiscard = (relationId, devId, jobId) => {
      dispatch(startDiscartingApplicant(relationId, devId, jobId));
   };

   const handleHire = (relationId, devId, jobTitle) => {
      dispatch(startHiringDeveloper(relationId, devId, jobTitle));
   };


   if (toHire.length === 0) {
      return (
         <Text marginTop={10}>
            Parece que tu lista está vacía. Revisa
            tus candidatos en la sección{' '}
            <ChakraLink
               as={Link}
               to='/co/myoffers'
               color='brandPrimaryPurple.500'
            >
               Mis Ofertas
            </ChakraLink>
         </Text>
      );
   }

   return (
      <VStack
         w='full'
         alignItems='flex-start'
         spacing={5}
      >
         {toHire.map((item) => {
            const { candidate, job, jobId, _id } = item;
            const { img, name, id: devId } = candidate;

            const alreadyHired = employees.some(item => item.employee.id === devId);

            return (
               <ItemWrapper key={_id}>
                  <IconImg
                     src={img}
                     boxSize={{ base: '100px' }}
                     alt={name}
                     isRounded
                  />

                  <VStack
                     alignItems={{
                        base: 'center',
                        xl: 'flex-start',
                     }}
                     spacing={5}
                  >
                     <ChakraLink as={Link} to={`/co/search/${devId}`}>
                        <Heading fontSize='xl' textAlign='center'>
                           {name}
                        </Heading>
                     </ChakraLink>
                     {
                        alreadyHired 
                        && 
                        <Badge colorScheme='purple' ml={3}>Ya contratado</Badge>
                     }
                     <VStack
                        spacing={0}
                        alignItems={{
                           base: 'center',
                           xl: 'flex-start',
                        }}
                     >
                        <Text>
                           Oferta por la que se le
                           aceptó la postulación:
                        </Text>
                        <Text>{job}</Text>
                     </VStack>
                  </VStack>

                  <HStack>
                     <Button
                        variant='outline'
                        onClick={ () => handleDiscard(_id, devId, jobId) }
                     >
                        Descartar
                     </Button>
                     <Button 
                        onClick={ () => handleHire(_id, devId, job)}
                     >
                        Contratar
                     </Button>
                  </HStack>
               </ItemWrapper>
            );
         })}
      </VStack>
   );
};

export default ToHireList;
