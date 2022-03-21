import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import JobMainInfo from './JobMainInfo';
import JobBody from './JobBody';
import { useDispatch } from 'react-redux';
import { setIsJobSelected } from 'actions/developer/jobs';
import Layout from 'components/layout';




const JobScreenContent = ({ job }) => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(setIsJobSelected(true));
        
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
         <Layout
            alignItems='center'
            h='max-content'
            padding={{}}
            paddingY={{ base: 20 }}
            paddingX={{ base: 7, lg: 20, xl: 5, '2xl': 7 }}
            bgColor='gray.50'
         >  
            <JobMainInfo jobInfo={job}/>
            <JobBody jobInfo={job} />
         </Layout>
      </>
   );
};

JobScreenContent.propTypes = {
   job: PropTypes.object,
};

export default JobScreenContent;
