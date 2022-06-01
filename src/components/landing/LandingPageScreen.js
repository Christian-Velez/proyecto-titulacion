import React, { useEffect, useState } from 'react';
import Main from './Main';
import { VStack } from '@chakra-ui/react';
import LoadingScreen from 'components/layout/LoadingScreen';
import { getLastJobs } from 'helpers/getJobs';


const LandingPageScreen = () => {
   const [ lastJobs, setLastJobs ] = useState([]);
   const [ isLoading, setIsLoading ] = useState(true);

   useEffect(() => {
      getLastJobs()
         .then(jobs => setLastJobs(jobs))
         .catch(err => console.log(err))
         .finally(() => setIsLoading(false));
         
   }, []);

   return (
      <VStack>
         {
            isLoading 
               ? <LoadingScreen />
               : <Main lastJobs={lastJobs}/>
         }
      </VStack>
   );
};

export default LandingPageScreen;
