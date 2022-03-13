

import React, {  useState } from 'react';
import PropTypes from 'prop-types';
import { Flex, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import IconImg from 'components/layout/IconImg';
import { CalendarIcon } from '@chakra-ui/icons';
import { FaDollarSign } from 'react-icons/fa';
import { RiBuilding2Fill } from 'react-icons/ri';
import { HiLocationMarker } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const JobItem = ({ job })=> {
   const navigate = useNavigate();
   const [isHovered, setIsHovered] = useState(false);

   const { company, title, salary, created_at, techsRequired, id } = job;
   const { img, name, location } = company;

   
   // Formatear fecha
   const publishedAt = new Date(created_at);
   const YY = publishedAt.getFullYear();
   const MM = ('0' + (publishedAt.getMonth() + 1)).slice(-2);
   const DD = ('0' + publishedAt.getDate()).slice(-2);


   const handleViewJob = () => {
      navigate(`./id/${id}`);
   };

  


   return (
      <Stack
         w='full'
         direction={{ base: 'column', lg: 'row'}}
         alignItems={{ base: 'center', lg: 'flex-start'}}
         spacing={10}
         border='1px solid'
         borderColor='gray.100'
         paddingY={10}
         paddingX={{ base: 5, lg: 10}}
         borderRadius='lg'
         _hover={{
            cursor: 'pointer',
         }}
         onMouseEnter={() => setIsHovered(true) }
         onMouseLeave={() => setIsHovered(false)}
         onClick = { handleViewJob }
      >
         <IconImg
            src={img}
            alt={name}
            boxSize={{ base:'100px'}}
            isRounded
         />

         <VStack maxW={{ lg: 'calc(100%-150px)'}} alignItems='flex-start' spacing={5}>  
            <Heading 
               fontSize='xl' 
               textDecor={ isHovered && 'underline'}
            > 
               { title } 
            
            </Heading>



            <Flex
               direction='row'
               gap={5}
               color='brandGray' 
               fontSize='sm'
               flexWrap='wrap'
            >
               
               <HStack>
                  <RiBuilding2Fill />
                  <Text> { name }</Text>
               </HStack>


               <HStack>
                  <HiLocationMarker />
                  <Text> { location }</Text>
               </HStack>

            </Flex>

            <Flex
               direction='row'
               gap={5}
               color='brandGray' 
               fontSize='sm'
               flexWrap='wrap'
            >
               
               <HStack>
                  <CalendarIcon />
                  <Text> {`${DD}-${MM}-${YY}`}</Text>
               </HStack>

               <HStack>
                  <FaDollarSign />
                  <Text>{ salary }/mensual</Text>
               </HStack>

            </Flex>

            <HStack justifyContent='flex-start' flexWrap='wrap'>
               {
                  techsRequired.map(req => {
                     const { technology: tech } = req;

                     return (
                        <IconImg
                           key={ job.id + tech.id + publishedAt}
                           alt={tech.name}
                           boxSize={{ base: 5 }}
                           src={tech.img}
                        />
                     );
                  })
               }
            </HStack>
         </VStack>
      </Stack>
   );
};

JobItem.propTypes = {
   job: PropTypes.object
};

export default JobItem;
