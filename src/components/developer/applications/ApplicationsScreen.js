
import React, { useEffect, useMemo, useState } from 'react';

import JobItem from './JobItem';
import { Heading, Text, VStack } from '@chakra-ui/react';
import { startLoadingJobs } from 'actions/developer/jobs';
import LoadingScreen from 'components/LoadingScreen';
import { useDispatch, useSelector } from 'react-redux';

const ApplicationsScreen = () => {
   const dispatch = useDispatch();
   
   const { allJobs } = useSelector(state => state.devJobs);
   const { id } = useSelector(state => state.auth);
   const filteredJobs = useMemo(
      () => allJobs.filter(job => job.applicants.includes(id)),
      [allJobs, id]
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
      <VStack
         padding={{ base: 7, lg: 20}}
         minH='100vh'
         spacing={20}
         alignItems='flex-start'
         w='full'
         className='animate__animated animate__fadeIn animate__faster'
      >
         <Heading fontSize={{ base: '2xl', lg: '3xl'}}> Mis postulaciones </Heading>
         
         <Text> 
            Consulta las ofertas a las que has enviado solicitud. 
            Algunas ofertas podrían no aparecer debido a que la empresa las ha desactivado
         </Text> 
         
         {
            isLoading 
            ? <LoadingScreen />
            :  
            <VStack 
               w='full' 
               alignItems='flex-start' 
               spacing={5}
            >
               {
                  filteredJobs.map(job => <JobItem key={job.id} job={job} />)
               }
            </VStack>
         }
      </VStack>
   );
};

export default ApplicationsScreen;
