import Layout from 'components/layout';
import DeveloperProfileContent from 'components/profiles/developer/DeveloperProfileContent';
import { startLoadingDevInfo } from 'helpers/company/startLoadingUserInfo';
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
   }, [ id ]);

   return (
      isLoading
         ? null :
      
         error 
            ? <Layout title='Ocurrio un error, probablemente el perfil no existe' />
            : <DeveloperProfileContent devInfo={devInfo}/> 
   
   );
};

export default SearchDeveloperProfileScreen;
