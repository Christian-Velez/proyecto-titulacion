


import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import IconImg from 'components/IconImg';
import { ArrowForwardIcon, CalendarIcon } from '@chakra-ui/icons';

const CompanyJob = ({job})=> {
   const { id, title, date, techsRequired, active} = job;



   const handleDeactivateJob = () => {
      console.log(id);
   };


   // Formatear fecha
   const publishedAt = new Date(date);
   const YY = publishedAt.getFullYear();
   const MM = ('0' + (publishedAt.getMonth() + 1)).slice(-2);
   const DD = ('0' + publishedAt.getDate()).slice(-2);

   return (
      
         <VStack 
            border='1px solid'
            borderRadius='md'
            borderColor='gray.100'
            padding={10}
         
            alignItems='flex-start' 
            spacing={5} 
            w='full'
         
         >
            <VStack alignItems='flex-start' spacing={0}>
               <Heading fontSize='xl'>
                  {title} 

                  <Badge 
                     ml={3} 
                     colorScheme={ active ? 'green' : 'red'}
                  >
                     { active ? 'ACTIVA' : 'ARCHIVADA' }
                  </Badge>
               </Heading>
               
               <HStack color='#B1B3BA' fontSize='sm'>
                  <CalendarIcon />
                  <Text> {`${DD}-${MM}-${YY}`}</Text>
               </HStack>
            
            </VStack>
            
         

            <VStack alignItems='flex-start'>
               <Text> Tecnologias </Text>
               <HStack justifyContent='flex-start'>
               {
                  techsRequired.map(req => {
                     const { technology: tech } = req;

                     return (
                        <IconImg
                           key={ job.id + tech.id }
                           alt={tech.name}
                           boxSize={{ base: 5 }}
                           src={tech.img}
                        />
                     );
                  })
               }
               </HStack>
            </VStack>


            <HStack>
               <Button
                  variant='outline'
                  colorScheme='gray'
                  onClick={ handleDeactivateJob }
               >
                  Archivar
               </Button> 
               <Button
                  rightIcon={<ArrowForwardIcon />}   
               >
                  Revisar
               </Button>
            </HStack>

         
         </VStack>



   );
};

CompanyJob.propTypes = {
   job: PropTypes.object
};

export default CompanyJob;
