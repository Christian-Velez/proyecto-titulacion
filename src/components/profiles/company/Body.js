import React from 'react';
import { Divider, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import IconImg from 'components/layout/IconImg';
import PropTypes from 'prop-types';



const Body = ({ companyInfo }) => {



   const { technologies } = useSelector(state => state.tech);
   const auxTech = technologies[0];

   return (
      <VStack
         w='full'
         alignItems='flex-start'
         spacing={10}
      >
         
         <Divider />
         <VStack
            w={{ base: 'full', xl: '50%' }}
            alignItems='flex-start'
         >
            <Heading fontSize='lg'>
               Calificaciones de { companyInfo.name }
            </Heading>

            <VStack w='full' p={5}>
               <HStack
                  w='full'
                  justifyContent='space-between'
               >
                  <Text>Salario competitivo</Text> <Text fontWeight='black'>0.0 / 5</Text>
               </HStack>

               <HStack
                  w='full'
                  justifyContent='space-between'
               >
                  <Text>Ambiente laboral</Text> <Text fontWeight='black'>0.0 / 5</Text>
               </HStack>

               <HStack
                  w='full'
                  justifyContent='space-between'
               >
                  <Text>Prestaciones</Text><Text fontWeight='black'>0.0 / 5</Text>
               </HStack>

               <HStack
                  w='full'
                  justifyContent='space-between'
               >
                  <Text>Proceso de contratación</Text><Text fontWeight='black'>0.0 / 5</Text>
               </HStack>
            </VStack>
         </VStack>

         <Divider />
         <VStack w='full' alignItems='flex-start'>
            <Heading fontSize='lg'>
               Tecnología más solicitada
            </Heading>


            <HStack 
               p={5} 
               alignItems='center'
               w='full'
               spacing={8}
            >

               {/*AUXILIAR, CAMBIAR POR LA TECNOLOGIA QUE MAS PIDE LA EMPRESA*/}
               {
                  auxTech && 
                  <>
                     <IconImg
                        src={ auxTech.img }
                        boxSize={{ 
                           base: '80px',
                           lg: '100px'
                        }}
                        alt={ auxTech.name }
                     />

                     <VStack
                        alignItems='flex-start'
                        maxWidth='50%'
                        
                     >
                        <Heading  fontSize='md'> { auxTech.name } </Heading>
                        <Text> usualmente requiere 5 años de experiencia</Text>
                        
                        
                     </VStack>
                  </>

               }



            </HStack>

         </VStack>
      </VStack>
   );
};

Body.propTypes = {
   companyInfo: PropTypes.object
};




export default Body;
