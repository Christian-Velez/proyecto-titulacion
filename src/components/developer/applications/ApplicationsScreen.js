import React, {
   useEffect,
   useMemo,
   useState,
} from 'react';

import JobItem from './JobItem';
import {
   Flex,
   Heading,
   HStack,
   VStack,
} from '@chakra-ui/react';
import { startLoadingJobs } from 'actions/developer/jobs';
import LoadingScreen from 'components/layout/LoadingScreen';
import {
   useDispatch,
   useSelector,
} from 'react-redux';
import Layout from 'components/layout';
import { Outlet } from 'react-router-dom';
import { getRejectedJobs } from 'helpers/getJobs';

const ApplicationsScreen = () => {
   const dispatch = useDispatch();

   const [rejectedJobs, setRejectedJobs] =
      useState([]);
   const { allJobs, isJobSelected } = useSelector(
      (state) => state.devJobs
   );
   const { id: devId } = useSelector(
      (state) => state.auth
   );

   const filteredJobs = useMemo(
      () =>
         allJobs.filter((job) =>
            job.applicants.includes(devId)
         ),
      [allJobs, devId]
   );

   // Solo cuando recarga la aplicacion se vuelven a pedir todos los trabajos
   const [isLoading, setIsLoading] =
      useState(true);
   useEffect(() => {
      if (allJobs.length === 0) {
         const startSettingRejectedJobs =
            async () => {
               const rejJobs =
                  await getRejectedJobs(devId);
               setRejectedJobs(rejJobs);
            };

         Promise.all([
            dispatch(startLoadingJobs()),
            startSettingRejectedJobs(),
         ]).then(() => {
            setIsLoading(false);
         });
      } else {
         setIsLoading(false);
      }
   }, [allJobs, dispatch, devId]);

   return (
      <Layout padding={{ base: 0 }} minH='100vh'>
         {isLoading ? (
            <LoadingScreen />
         ) : (
            <HStack
               w='full'
               alignItems='flex-start'
               justifyContent='flex-start'
            >
               <VStack
                  spacing={40}
                  justifyContent='flex-start'
                  alignItems='flex-start'
                  className='animate__animated animate__fadeIn animate__faster'
                  maxH={{ xl: '100vh' }}
                  overflowY={{ xl: 'scroll' }}
                  padding={{
                     base: 7,
                     lg: 10,
                     '2xl': 20,
                  }}
                  w={{ base: 'full', xl: '75%' }}
                  display={{
                     base:
                        isJobSelected && 'none',
                     xl: 'flex',
                  }}
               >
                  <Heading
                     fontSize={{
                        base: '2xl',
                        lg: '3xl',
                     }}
                  >
                     Mis postulaciones (
                     {filteredJobs.length})
                  </Heading>

                  <Flex
                     w='full'
                     spacing={5}
                     flexWrap='wrap'
                     gap={10}
                  >
                     {filteredJobs.map((job) => (
                        <JobItem
                           key={job.id}
                           job={job}
                        />
                     ))}
                  </Flex>

                  {rejectedJobs?.length > 0 && (
                     <VStack
                        w='full'
                        alignItems='flex-start'
                        spacing={10}
                     >
                        <Heading
                           fontSize={{
                              base: 'xl',
                              lg: '2xl',
                           }}
                        >
                           Te han rechazado de...
                        </Heading>

                        <Flex
                           w='full'
                           spacing={5}
                           flexWrap='wrap'
                           gap={10}
                        >
                           {rejectedJobs.map(
                              (job) => {
                                 return (
                                    <JobItem
                                       key={
                                          job.id
                                       }
                                       job={job}
                                       status='rejected'
                                    />
                                 );
                              }
                           )}
                        </Flex>
                     </VStack>
                  )}
               </VStack>

               <Flex
                  display={{
                     base:
                        !isJobSelected && 'none',
                     xl: 'flex',
                  }}
                  maxH={{ xl: '100vh' }}
                  overflowY={{ xl: 'scroll' }}
                  w={{ base: 'full', xl: '25%' }}
                  minW='380px'
               >
                  <Outlet />
               </Flex>
            </HStack>
         )}
      </Layout>
   );
};

export default ApplicationsScreen;
