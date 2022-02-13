//import Layout from 'components/layout';
import { startLoadingCoInfo } from 'helpers/company/startLoadingUserInfo';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingScreen from 'components/layout/LoadingScreen';
import CompanyProfileContent from 'components/profiles/company/CompanyProfileContent';


const SearchCompanyProfileScreen = () => {
   const [companyInfo, setCompanyInfo] = useState({});
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(false);

   const { id } = useParams();
   

   useEffect(() => {
      startLoadingCoInfo(id)
         .then(coInfo => {
            if(coInfo === null) {
               throw Error;
            }
            setCompanyInfo(coInfo);
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
         ? <LoadingScreen /> :
      
         error 
            ? <h1>Ocurrio un error, probablemente el perfil no existe </h1> 
            : <CompanyProfileContent companyInfo={ companyInfo }/> 
   );
};

export default SearchCompanyProfileScreen;