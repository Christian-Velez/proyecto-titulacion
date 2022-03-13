import React from 'react';
import IconImg from 'components/layout/IconImg';
import ItemWrapper from './ItemWrapper';
import {
   Button,
   Heading,
   HStack,
   Text,
   VStack,
   Link as ChakraLink,
} from '@chakra-ui/react';
import { startFiringDeveloper } from 'actions/company/user';
import {
   useDispatch,
   useSelector,
} from 'react-redux';
import { Link } from 'react-router-dom';

const EmployeesList = () => {
   const dispatch = useDispatch();
   const { employees } = useSelector(
      (state) => state.companyInfo
   );

   if (employees.length === 0) {
      return (
         <Text marginTop={10}>
            Aún no has contratado a ningun
            desarrollador.
         </Text>
      );
   }

   const handleFireDev = (relationId) => {
      dispatch(startFiringDeveloper(relationId));
   };

   const getDate = (date) => {
      const objectDate = new Date(date);
      const YY = objectDate.getFullYear();
      const MM = (
         '0' +
         (objectDate.getMonth() + 1)
      ).slice(-2);
      const DD = (
         '0' + objectDate.getDate()
      ).slice(-2);
      return `${DD}-${MM}-${YY}`;
   };

   return (
      <VStack
         w='full'
         alignItems='flex-start'
         spacing={5}
      >
         {employees.map((item) => {
            const { employee, _id, job, date } =
               item;
            const {
               img,
               name,
               id: devId,
            } = employee || {};

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
                     <ChakraLink
                        as={Link}
                        to={`/co/search/${devId}`}
                     >
                        <Heading fontSize='xl'>
                           {name}
                        </Heading>
                     </ChakraLink>

                     <VStack
                        spacing={0}
                        alignItems={{
                           base: 'center',
                           xl: 'flex-start',
                        }}
                     >
                        <Text>
                           Contratado el:{' '}
                           {getDate(date)}
                        </Text>
                        <Text>
                           Oferta por la que se le
                           contrató:
                        </Text>
                        <Text>{job}</Text>
                     </VStack>
                  </VStack>

                  <HStack>
                     <Button
                        variant='outline'
                        onClick={() =>
                           handleFireDev(_id)
                        }
                     >
                        Despedir
                     </Button>
                  </HStack>
               </ItemWrapper>
            );
         })}
      </VStack>
   );
};

export default EmployeesList;