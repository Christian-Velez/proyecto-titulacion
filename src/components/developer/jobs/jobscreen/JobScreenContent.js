import React from 'react';
import PropTypes from 'prop-types';
import {
   VStack,
} from '@chakra-ui/react';
import JobMainInfo from './JobMainInfo';
import JobBody from './JobBody';




const JobScreenContent = ({ job }) => {
   console.log(job);

   return (
      <VStack
         paddingX={{ base: 7, lg: 20 }}
         paddingY={{ base: 20 }}
         spacing={20}
         w={{ base: 'full', '2xl': '50%'}}
         className='animate__animated animate__fadeIn animate__faster'
         minH='100vh'
         alignItems='center'
      >
         
         <JobMainInfo jobInfo={job}/>
         <JobBody jobInfo={job} />

      </VStack>
   );
};

JobScreenContent.propTypes = {
   job: PropTypes.object,
};

export default JobScreenContent;
