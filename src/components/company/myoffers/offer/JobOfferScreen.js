import React from 'react';
import useScrollToTop from 'hooks/useScrollToTop';
import {
   Badge,
   Button,
   Flex,
   Heading,
   HStack,
   Text,
   VStack,
} from '@chakra-ui/react';
import Layout from 'components/layout';
import { getDevReqPercentage } from 'helpers/company/getDevReqPercentage';
import { findJobById } from 'helpers/findJobById';
import {
   useSelector,
} from 'react-redux';
import {
   Navigate,
   useParams,
} from 'react-router-dom';
import ApplicantItem from './ApplicantItem';
import IconImg from 'components/layout/IconImg';

const JobOfferScreen = () => {
   useScrollToTop();
   
   const { jobs: allJobs } = useSelector(
      (state) => state.companyInfo
   );
   const { id } = useParams();
   const job = findJobById(allJobs, id);

   if (!job) {
      return <Navigate to='/co/myoffers' />;
   }

   const {
      title,
      active,
      applicants,
      techsRequired,
      rejectedUsers,
   } = job;

   // Ordena a los postulados por el porcentaje de requerimientos cumplidos
   let orderedApplicants;

   if (techsRequired.length > 0) {
      orderedApplicants = applicants.map(
         (app) => {
            const percentage =
               getDevReqPercentage(
                  techsRequired,
                  app.technologies
               );
            return {
               ...app,
               percentage,
            };
         }
      );

      orderedApplicants.sort((a, b) =>
         a.percentage < b.percentage ? 1 : -1
      );
   } else {
      orderedApplicants = [...applicants];
   }

   return (
      <Layout minH='100vh'>
         <VStack alignItems='flex-start' spacing={5}>
            <Heading
               fontSize={{
                  base: '3xl',
                  lg: '4xl',
               }}
            >
               {title}

               <Badge
                  ml={3}
                  colorScheme={
                     active ? 'green' : 'red'
                  }
               >
                  {active
                     ? 'ACTIVA'
                     : 'ARCHIVADA'}
               </Badge>
            </Heading>

            <HStack spacing={3}>
               {techsRequired.map(
                  (item, i) => {
                     const { technology } = item;

                     if(technology) {
                        return <IconImg
                           alt={technology.name}
                           src={technology.img}
                           key={i}
                           boxSize={{ base: '30px' }}
                        />
                     }

                     return null;
               })}
            </HStack>
         </VStack>

         <HStack>
            <Heading
               fontSize={{
                  base: 'xl',
                  lg: '2xl',
               }}
            >
               Postulados
            </Heading>
         </HStack>

         <Flex
            w='full'
            flexWrap='wrap'
            gap={10}
            justifyContent={{
               base: 'center',
               md: 'flex-start',
            }}
         >
            {orderedApplicants.length === 0 ? (
               <Text margin={10}>
                  {' '}
                  Sin entradas.{' '}
               </Text>
            ) : (
               orderedApplicants.map((app) => (
                  <ApplicantItem
                     key={app.id}
                     applicant={app}
                  />
               ))
            )}
         </Flex>

         <HStack>
            <Heading
               fontSize={{
                  base: 'xl',
                  lg: '2xl',
               }}
            >
               Rechazados
            </Heading>
         </HStack>

         <Flex
            w='full'
            flexWrap='wrap'
            gap={10}
            justifyContent={{
               base: 'center',
               md: 'flex-start',
            }}
         >
            {rejectedUsers.length === 0 ? (
               <Text margin={10}>
                  Sin entradas.
               </Text>
            ) : (
               rejectedUsers.map((user) => (
                  <ApplicantItem
                     key={user.id}
                     applicant={user}
                     rejected
                  />
               ))
            )}
         </Flex>
      </Layout>
   );
};

export default JobOfferScreen;
