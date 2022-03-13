import React from 'react';
import useScrollToTop from 'hooks/useScrollToTop';
import {
   Badge,
   Button,
   Flex,
   Heading,
   HStack,
   Text,
} from '@chakra-ui/react';
import Layout from 'components/layout';
import { getDevReqPercentage } from 'helpers/company/getDevReqPercentage';
import { findJobById } from 'helpers/findJobById';
import { useDispatch, useSelector } from 'react-redux';
import {
   Navigate,
   useParams,
} from 'react-router-dom';
import ApplicantItem from './ApplicantItem';
import { startSettingCompanyInfo } from 'actions/company/user';

const JobOfferScreen = () => {
   const dispatch = useDispatch();
   useScrollToTop();
   const { loading } = useSelector(state => state.ui);
   const { jobs: allJobs } = useSelector(state => state.companyInfo);
   const { id } = useParams();
   const job = findJobById(allJobs, id);


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
      orderedApplicants = [ ...applicants ];
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

         <HStack>
            <Heading  fontSize={{ base: 'xl', lg: '2xl' }}> Postulados </Heading>
            <Button onClick={ () => dispatch(startSettingCompanyInfo())} isLoading={loading}>Actualizar</Button>
         </HStack>

         <Flex 
            w='full'
            flexWrap='wrap'
            gap={10}
            justifyContent={{ base: 'center', 'md': 'flex-start'}}
         >
            {
               orderedApplicants.length === 0
                  ? <Text margin={10}> Sin entradas. </Text>
                  : orderedApplicants.map(app =>  <ApplicantItem key={app.id} applicant={app} /> )
            }
         </Flex>
      </Layout>
   );
};

export default JobOfferScreen;
