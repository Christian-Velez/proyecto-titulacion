

import React, {  useState } from 'react';
import PropTypes from 'prop-types';
import { Flex, Heading, HStack, Stack, Tag, TagLeftIcon, Text, VStack } from '@chakra-ui/react';
import IconImg from 'components/layout/IconImg';
import { useNavigate } from 'react-router-dom';
import { RiMoneyDollarCircleFill, RiBuilding2Fill } from  'react-icons/ri'
import { AiFillTag } from 'react-icons/ai';


import { format } from 'timeago.js';
import 'helpers/timeAgoRegister';

const JobItem = ({ job })=> {
   const navigate = useNavigate();
   const [isHovered, setIsHovered] = useState(false);

   const { company, title, salary, created_at, techsRequired, id, category } = job;
   const { img, name, location } = company;

   const handleViewJob = () => {
      navigate(`./id/${id}`);
   };

   return (
      <Stack
         w='full'
         direction={{ base: 'column', lg: 'row'}}
         alignItems='flex-start'
         spacing={10}
         border='1px solid'
         borderColor='gray.100'
         paddingY={10}
         paddingX={10}
         borderRadius='lg'
         _hover={{
            cursor: 'pointer',
         }}
         onMouseEnter={() => setIsHovered(true) }
         onMouseLeave={() => setIsHovered(false)}
         onClick = { handleViewJob }

         bgColor='gray.50'
      >
         <IconImg
            src={img}
            alt={name}
            boxSize={{ base:'100px'}}
            isRounded
         />

         <VStack 
            maxWidth={{ xl: 'calc(100% - 200px)' }}
            alignItems='flex-start' 
            spacing={5}
         >  
            <Heading 
               fontSize='xl' 
               textDecor={ isHovered && 'underline'}
            > 
               { title } 
            </Heading>


            <HStack 
               color='brandGray' 
               fontSize='sm' 
               justifyContent='space-between'
               
            >
               <Text>{ location }</Text>
               <Text> {format(created_at, 'es_ES')}</Text>
            </HStack>


            <Flex
               direction='row'
               gap={5}
               color='brandGray' 
               fontSize='sm'
               flexWrap='wrap'
            >
               <Tag borderRadius='full' colorScheme='cyan'>
                  <TagLeftIcon as={RiBuilding2Fill}/>
                  {name}
               </Tag>

               <Tag borderRadius='full' colorScheme='purple'>
                  <TagLeftIcon as={AiFillTag} />
                  {category}
               </Tag>

               <Tag borderRadius='full' colorScheme='green'>
                  <TagLeftIcon as={RiMoneyDollarCircleFill}/>
                  {salary}/m
               </Tag>
            </Flex>



            <HStack justifyContent='flex-start' flexWrap='wrap'>
               {
                  techsRequired.map(req => {
                     const { technology: tech } = req;

                     return (
                        tech &&
                        <IconImg
                           key={ job.id + tech.id + created_at}
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
