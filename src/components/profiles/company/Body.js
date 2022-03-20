import React, { useMemo } from 'react';
import { Button, Divider, Heading, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import IconImg from 'components/layout/IconImg';
import PropTypes from 'prop-types';
import RateModal from './RateModal';
import { getProm } from '../getProm';
import { Rating } from 'react-simple-star-rating';



const Body = ({ companyInfo }) => {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const { employees, qualifications, mostReqTechnology, averageYears } = companyInfo;
   
   // Revisa si el usuario que revisa el perfil es empleado para permitirle o no calificar a la empresa
   const { id: devId } = useSelector(state => state.devInfo);
   const imEmployee = employees.some(item => item.employee.id === devId);
   const alreadyRated = qualifications.some(item => item.ratedBy === devId);


   const coRatings = useMemo(() => {
      const initialValue = {
         salario: [],
         ambiente: [],
         prestaciones: [],
         proceso: [],
      };

      qualifications.forEach(element => {
         const { ratings } = element;
   
         const keys = Object.keys(ratings);
         
         keys.forEach(key => {
            initialValue[key]?.push(ratings[key]);
         });
      });
      return initialValue;

   }, [ qualifications ]);

   const salario =
      coRatings.salario.length === 0
         ? 0
         : getProm(coRatings.salario);

   const ambiente = 
      coRatings.ambiente.length === 0 
         ? 0 
         : getProm(coRatings.ambiente);

   const prestaciones = 
      coRatings.prestaciones.length === 0
         ? 0
         : getProm(coRatings.prestaciones);

   const proceso =
      coRatings.proceso.length === 0
         ? 0
         : getProm(coRatings.proceso);

   const config = {
      readonly: true,
      size: 20
   }

   return (
      <VStack
         w='full'
         alignItems='flex-start'
         spacing={10}
      >
         <RateModal isOpen={isOpen} onClose={onClose} companyInfo={companyInfo}/>
         <Divider />
         <VStack
            w={{ base: 'full', xl: '50%' }}
            alignItems='flex-start'
         >
            <HStack spacing={10}>
               <Heading fontSize='lg'>
                  Calificaciones de { companyInfo.name } ({qualifications.length})
               </Heading>

               {
                  imEmployee && !alreadyRated &&
                  <Button colorScheme='brandPrimaryPurple' onClick={onOpen}> Calificar </Button>
               }
            </HStack>


            <VStack w='full' p={5}>
               <HStack
                  w='full'
                  justifyContent='space-between'
               >
                  <Text>Salario competitivo</Text>
                  <Rating 
                     {...config}
                     initialValue={salario}
                  />
               </HStack>

               <HStack
                  w='full'
                  justifyContent='space-between'
               >
                  <Text>Ambiente laboral</Text>
                  <Rating 
                     {...config}
                     initialValue={ambiente}
                  />
               </HStack>

               <HStack
                  w='full'
                  justifyContent='space-between'
               >
                  <Text>Prestaciones</Text>
                  <Rating 
                     {...config}
                     initialValue={prestaciones}
                  />
               </HStack>

               <HStack
                  w='full'
                  justifyContent='space-between'
               >
                  <Text>Proceso de contratación</Text>
                  <Rating 
                     {...config}
                     initialValue={proceso}
                  />
               </HStack>
            </VStack>
         </VStack>

         <Divider />
         <VStack w='full' alignItems='flex-start'>
            <Heading fontSize='lg'>
               Tecnología más solicitada
            </Heading>
            
            {
               !mostReqTechnology || !averageYears 
                  ? <Text style={{ margin: '30px'}}> Sin registros. </Text>
                  : (
                     <HStack 
                        p={5} 
                        alignItems='center'
                        w='full'
                        spacing={8}
                     >
                        <IconImg
                           src={ mostReqTechnology.img }
                           boxSize={{ 
                              base: '80px',
                              lg: '100px'
                           }}
                           alt={ mostReqTechnology.name }
                        />

                        <VStack
                           alignItems='flex-start'
                           maxWidth='50%'
                           
                        >
                           <Heading  fontSize='md'> { mostReqTechnology.name } </Heading>    
                           <Text> usualmente requiere {averageYears.toFixed(0)} {averageYears === 1 ? 'año' : 'años'} de experiencia</Text>
                        </VStack>
                     </HStack>
                  )
            }

         </VStack>
      </VStack>
   );
};

Body.propTypes = {
   companyInfo: PropTypes.object
};




export default Body;
