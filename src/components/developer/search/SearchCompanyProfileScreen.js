//import Layout from 'components/layout';
import { startLoadingCoInfo } from 'helpers/company/startLoadingUserInfo';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CompanyProfileContent from 'components/profiles/company/CompanyProfileContent';
import Layout from 'components/layout';


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
         ? null :
      
         error 
            ? <Layout title='Ocurrio un error, probablemente el perfil no existe' />
               
            : <CompanyProfileContent companyInfo={ companyInfo }/> 
   );
};

export default SearchCompanyProfileScreen;