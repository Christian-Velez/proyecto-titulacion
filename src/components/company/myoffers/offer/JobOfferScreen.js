import {
   Badge,
   Heading,
   HStack,
   Text,
   VStack,
} from '@chakra-ui/react';
import IconImg from 'components/IconImg';
import { findJobById } from 'helpers/findJobById';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
   Navigate,
   useParams,
} from 'react-router-dom';

const JobOfferScreen = () => {
   const { jobs: allJobs } = useSelector(state => state.companyInfo);
   const { id } = useParams();
   const job = findJobById(allJobs, id);

   const { title, active, applicants } = job;


   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   return !job ? (
      <Navigate to='/co/myoffers' />
   ) : (
      <VStack
         padding={{ base: 7, lg: 20 }}
         spacing={20}
         alignItems='flex-start'
         w='full'
         className='animate__animated animate__fadeIn animate__faster'
         minH='100vh'
      >
         <Heading
            fontSize={{ base: '2xl', lg: '3xl' }}
         >
            { title }

            <Badge 
               ml={3} 
               colorScheme={ active ? 'green' : 'red'}
            >
               { active ? 'ACTIVA' : 'ARCHIVADA' }
            </Badge>
         </Heading>


         {
            applicants.map(app => {
               const { img, name, location, id } = app;

               return (

                  <HStack key={id}>
                     <IconImg
                        src={img}
                        alt={name}
                        boxSize={{ base: '80px'}}
                     />

                     <Text> {name} </Text>
                     <Text> {location} </Text> 
                  </HStack>

               );
            })
         }
      </VStack>
   );
};

export default JobOfferScreen;
