import LoadingScreen from 'components/LoadingScreen';
import DeveloperProfileContent from 'components/profiles/developer/DeveloperProfileContent';
import { startLoadingDevInfo } from 'helpers/company/startLoadingDevInfo';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SearchDeveloperProfileScreen = () => {
   const [devInfo, setDevInfo] = useState({});


   const [isLoading, setIsLoading] = useState(true);


   const [error, setError] = useState(false);


   const { id } = useParams();
   

   useEffect(() => {

      startLoadingDevInfo(id)
         .then((devInf) => {
            if(devInf === null) {
               throw Error;
            }

            setDevInfo(devInf);
         })
         .catch(() => {
            setError(true);
         })
         .finally(() => {
            setIsLoading(false);
         });
   }, [id]);
   


   return (
      isLoading
      ? <LoadingScreen /> :
      
      error 
      ? <h1>Ocurrio un error, probablemente el developer no existe </h1> 
      : <DeveloperProfileContent devInfo={devInfo}/> 
   
   );
};

export default SearchDeveloperProfileScreen;
