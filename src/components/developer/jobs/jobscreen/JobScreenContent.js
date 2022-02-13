import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
   VStack,
} from '@chakra-ui/react';
import JobMainInfo from './JobMainInfo';
import JobBody from './JobBody';
import { useDispatch } from 'react-redux';
import { setIsJobSelected } from 'actions/developer/jobs';
import Layout from 'components/layout';




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


   // Arreglar los estilos en distintos dispositivos
   // el screen se ve como en dispositivos moviles en
   // algunas laptops
   return (
      <>
         <div id='aux'></div>
         <Layout
            alignItems='center'
            h='max-content'
            padding={{}}
            paddingX={{ base: 7 }}
            paddingY={{ base: 20 }}
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
