import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
   VStack,
} from '@chakra-ui/react';
import JobMainInfo from './JobMainInfo';
import JobBody from './JobBody';
import { useDispatch } from 'react-redux';
import { setIsJobSelected } from 'actions/developer/jobs';




const JobScreenContent = ({ job }) => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(setIsJobSelected(true));
        
      // Cleanup
      return () => {
         dispatch(setIsJobSelected(false));
      };
   }, [dispatch]);

   useEffect(() => {
      const aux = document.getElementById('aux');
      aux.scrollIntoView();

      window.scrollTo(0,0);
   }, [job]);


   return (
      <>
         <div id='aux'></div>
         <VStack
            alignItems='center'
            className='animate__animated animate__fadeIn animate__faster'
            h='max-content'
            paddingX={{ base: 7 }}
            paddingY={{ base: 20 }}
            spacing={20}
            w='full'
         >  
            <JobMainInfo jobInfo={job}/>
            <JobBody jobInfo={job} />
         </VStack>
      </>
   );
};

JobScreenContent.propTypes = {
   job: PropTypes.object,
};

export default JobScreenContent;
