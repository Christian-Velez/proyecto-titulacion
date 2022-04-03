import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

// Components
import IconImg from 'components/layout/IconImg';
import {
   Button,
   Heading,
   HStack,
   Text,
   VStack,
   Flex,
   Tag,
   TagLeftIcon,
   Link as ChakraLink
} from '@chakra-ui/react';
import { RiMoneyDollarCircleFill } from  'react-icons/ri'
import { AiFillTag } from 'react-icons/ai';
import { startApplyingProcess } from 'actions/developer/jobs';


// Cambiar el idioma de timeAgo a español
import 'helpers/timeAgoRegister';
import { Link, useNavigate } from 'react-router-dom';

const JobItem = ({ job }) => {
   const navigate = useNavigate();
   const { title, company, description, id, category, salary } =
      job;
   const {
      img,
      name,
      id: companyId,
   } = company;

   const dispatch = useDispatch();

   const handleCancelApply = () => {
      const alreadyApply = true;
      dispatch(
         startApplyingProcess(id, alreadyApply)
      );
   };

   return (
      <VStack
         w='23%'
         minW='400px'
         minH='500px'
         alignItems='flex-start'
         border='1px solid'
         borderColor='gray.100'
         borderRadius='lg'
         spacing={10}
         padding={10}
         bgColor='gray.50'
      >  
         <Flex
            onClick={ () => navigate(`/dev/search/${companyId}`) }
            cursor='pointer'
         >
            <IconImg
               alt={name}
               src={img}
               boxSize={{ base: '80px' }}
               isRounded
            />

         </Flex>

         <VStack
            w={{ base: 'full', lg: '80%' }}
            alignItems='flex-start'
            spacing={5}
         >
            <ChakraLink as={Link} to={`/dev/jobs/id/${id}`}>
               <Heading fontSize='2xl'>
                  {title}
               </Heading>

            </ChakraLink>

            <HStack w='full'>
               <Tag borderRadius='full' colorScheme='purple'>
                  <TagLeftIcon as={AiFillTag} />
                  {category}
               </Tag>
               <Tag borderRadius='full' colorScheme='green'>
                  <TagLeftIcon as={RiMoneyDollarCircleFill}/>
                  {salary}/m
               </Tag>
            </HStack>

            <VStack
               alignItems='flex-start'
            >
               <Text
                  isTruncated
                  noOfLines={3}
                  maxW='300px'
                  whiteSpace='wrap'
                  color='brandGray'

               >
                  {description}
               </Text>
            </VStack>

            <Button
               colorScheme='brandPrimary'
               onClick={handleCancelApply}
            >
               Cancelar postulación
            </Button>
         </VStack>
      </VStack>
   );
};

JobItem.propTypes = {
   job: PropTypes.object,
};

export default JobItem;
