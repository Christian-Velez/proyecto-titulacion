import {
   Badge,
   Flex,
   Heading,
   VStack,
} from '@chakra-ui/react';
import { findJobById } from 'helpers/findJobById';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
   Navigate,
   useParams,
} from 'react-router-dom';
import ApplicantItem from './ApplicantItem';

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

         <Heading  fontSize={{ base: 'xl', lg: '2xl' }}> Postulados </Heading>


         <Flex 
            w='full'
            flexWrap='wrap'
            gap={10}
            justifyContent={{ base: 'center', 'md': 'flex-start'}}
         >
            {
               applicants.map(app => 
                  <ApplicantItem key={app.id} applicant={app}/>
               )
            }
         </Flex>

      </VStack>
   );
};

export default JobOfferScreen;
