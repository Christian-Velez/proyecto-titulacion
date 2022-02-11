// Hooks
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// Router
import {
   Navigate,
   Route,
   Routes,
} from 'react-router-dom';

// Actions
import { startLoadingSoftSkills } from 'actions/admin/softskills';
import { startLoadingTechnologies } from 'actions/admin/technologies';
import { startSettingCompanyInfo } from 'actions/company/user';

// Componentes
import LoadingScreen from 'components/LoadingScreen';
import SideBar from 'components/navbar/SideBar';

import TechnologiesSearchScreen from 'components/technologies/TechnologiesSearchScreen';
import TechnologyScreen from 'components/technologies/TechnologyScreen';

import WelcomeCompany from 'components/company/WelcomeCompany';
import CompanyProfile from 'components/company/profile/CompanyProfile';
import EditCompanyProfileScreen from 'components/company/profile/edit/EditCompanyProfileScreen';
import NewJobOfferScreen from 'components/company/newoffer/NewJobOfferScreen';
import CompanyOffersScreen from 'components/company/myoffers/CompanyOffersScreen';
import JobOfferScreen from 'components/company/myoffers/offer/JobOfferScreen';
import SearchDeveloperProfileScreen from 'components/company/search/SearchDeveloperProfileScreen';

import { Stack } from '@chakra-ui/react';

const CompanyRoutes = () => {
   const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(true);


   // Carga toda la informacion inicial necesaria
   useEffect(() => {
      Promise.all([
         dispatch(startSettingCompanyInfo()),
         dispatch(startLoadingTechnologies()),
         dispatch(startLoadingSoftSkills()),
      ])
         .then(() => setIsLoading(false))
         .catch((err) => console.log(err));
   }, [dispatch]);


   return (
      <Stack
         direction={{ base: 'column', lg: 'row' }}
         w='full'
         alignItems='flex-start'
         className='animate__animated animate__fadeIn animate__faster'
         wordBreak='break-word'
      >
         {
            isLoading
            ? <LoadingScreen />
            : (
               <>               
                  <SideBar />
                  <Routes>
                     <Route path='/welcome' element={<WelcomeCompany />} />

                     <Route path='profile' element={<CompanyProfile />}/>
                     <Route path='profile/edit' element={ <EditCompanyProfileScreen /> } />


                     <Route path='newjob' element={<NewJobOfferScreen /> } />

                     <Route path='myoffers' element={ <CompanyOffersScreen /> } />
                     <Route path='myoffers/:id' element={ <JobOfferScreen /> } />

                     <Route path='technologies' element={  <TechnologiesSearchScreen /> } />
                     <Route path='technologies/:name' element={ <TechnologyScreen />} />


                     <Route  path='developers' element={<p>aqui van los contratados y por contratar </p> }/>

                     <Route path='messages' element={<p> aqui van los mensages </p> } />

                     <Route path='search' element={ <p> Aqui va el buscador de desarrolladores </p>  } />
                     <Route path='search/:id' element={ <SearchDeveloperProfileScreen /> }/>

                     <Route path='*' element={<Navigate to='/co' />} />
                  </Routes>

               </>
            )
         }
      </Stack>
   );
};

export default CompanyRoutes;
