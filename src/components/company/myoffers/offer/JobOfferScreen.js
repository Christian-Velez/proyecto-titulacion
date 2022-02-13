import {
   Badge,
   Flex,
   Heading,
   VStack,
} from '@chakra-ui/react';
import Layout from 'components/layout';
import { getDevReqPercentage } from 'helpers/company/getDevReqPercentage';
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

   
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   if(!job) {
      return <Navigate to='/co/myoffers' />;
   }


   const { title, active, applicants, techsRequired } = job;

   // Ordena a los postulados por el porcentaje de requerimientos cumplidos
   let orderedApplicants;

   if(techsRequired.length > 0) {
      orderedApplicants = applicants.map(app => {
         const percentage = getDevReqPercentage(techsRequired, app.technologies);
         return {
            ...app,
            percentage
         };
      });

      orderedApplicants.sort((a, b) => a.percentage < b.percentage ? 1 : -1);
   } else {
      orderedApplicants = [ ...applicants ]
   }

   return (
      <Layout
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
               orderedApplicants.map(app =>  <ApplicantItem key={app.id} applicant={app} /> )
            }
         </Flex>
      </Layout>
   );
};

export default JobOfferScreen;
