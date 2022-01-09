


import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Button, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import IconImg from 'components/IconImg';
import { ArrowForwardIcon, CalendarIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { startUpdatingJob } from 'actions/company/job';

const CompanyJob = ({job})=> {

   const dispatch = useDispatch();
   const { id, title, created_at, techsRequired, active, salary } = job;



   const handleToggleJob = () => {
      dispatch(startUpdatingJob({id, active: !active}));
   };


   // Formatear fecha
   const publishedAt = new Date(created_at);
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
            <Heading fontSize='xl'>
               {title} 

               <Badge 
                  ml={3} 
                  colorScheme={ active ? 'green' : 'red'}
               >
                  { active ? 'ACTIVA' : 'ARCHIVADA' }
               </Badge>
            </Heading>


            <Flex
               direction='row'
               gap={5}
               color='#B1B3BA' 
               fontSize='sm'
               flexWrap='wrap'
            >
               
               <HStack>
                  <CalendarIcon />
                  <Text> {`${DD}-${MM}-${YY}`}</Text>
               </HStack>

               <HStack>
                  <Text>USD { salary.toFixed(2) } mensual</Text>
               </HStack>
            
            </Flex>
            
         

            <HStack justifyContent='flex-start' flexWrap='wrap'>
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


            <HStack w='full'>
               <Button
                  variant='outline'
                  colorScheme='gray'
                  onClick={ handleToggleJob }
                  size='md'
                  maxW='50%'
                  fontSize={{ base: 'sm', md: 'md'}}
               >
                  {
                     active ? 'Archivar' : 'Desarchivar'
                  }
               </Button> 
               <Button
                  rightIcon={<ArrowForwardIcon />}   
                  size='md'
                  maxW='50%'
                  fontSize={{ base: 'sm', md: 'md'}}
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
