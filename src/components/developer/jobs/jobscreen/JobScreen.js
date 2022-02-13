

import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import LoadingScreen from 'components/layout/LoadingScreen';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingJobs } from 'actions/developer/jobs';
import { findJobById } from 'helpers/findJobById';
import JobScreenContent from './JobScreenContent';

const JobScreen = () => {
   const dispatch = useDispatch();
   const { allJobs } = useSelector(state => state.devJobs);

   // Carga todos los trabajos solo al recargar la app
   if(allJobs.length === 0) {
      dispatch(startLoadingJobs());
   }
   const { id } = useParams();
   const [isLoading, setIsLoading] = useState(true);
   const [job, setJob] = useState({});


 
   // Setea el trabajo encontrado
   // usando el id de los params
   useEffect(() => {
      if(allJobs.length > 0) {
         const auxJob = findJobById(allJobs, id);
         setJob(auxJob);
         setIsLoading(false);
      }
   }, [allJobs, id]);

   return (
      isLoading
      ? <LoadingScreen />
      : 
         !job
         ? <Navigate to='/dev/jobs' />
         : <JobScreenContent job={job}/>
      
   );
};

JobScreen.propTypes = {

};

export default JobScreen;
