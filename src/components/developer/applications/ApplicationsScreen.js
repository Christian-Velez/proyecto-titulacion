
import React, { useEffect, useMemo, useState } from 'react';

import JobItem from './JobItem';
import { Flex } from '@chakra-ui/react';
import { startLoadingJobs } from 'actions/developer/jobs';
import LoadingScreen from 'components/layout/LoadingScreen';
import { useDispatch, useSelector } from 'react-redux';
import Layout from 'components/layout';

const ApplicationsScreen = () => {
   const dispatch = useDispatch();
   
   const { allJobs } = useSelector(state => state.devJobs);
   const { id: devId } = useSelector(state => state.auth);


   const filteredJobs = useMemo(
      () => allJobs.filter(job => job.applicants.includes(devId)),
      [allJobs, devId]
   );

   // Solo cuando recarga la aplicacion se vuelven a pedir todos los trabajos
   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      if (allJobs.length === 0) {
         Promise.all([
            dispatch(startLoadingJobs()),
         ]).then(() => {
            setIsLoading(false);
         });
      } else {
         setIsLoading(false);
      }
   }, [ allJobs, dispatch ]);

   return (
      <Layout 
         title={ `Mis postulaciones (${filteredJobs.length})`}
         minH='100vh'
      >
         
         {
            isLoading 
               ? <LoadingScreen />
               :  
               <Flex
                  w='full' 
                  spacing={5}
                  flexWrap='wrap'
                  gap={10}
               >
                  {
                     filteredJobs.map(job => <JobItem key={job.id} job={job} />)
                  }
               </Flex>
         }
      </Layout>
   );
};

export default ApplicationsScreen;
