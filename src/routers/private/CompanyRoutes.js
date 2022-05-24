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
import LoadingScreen from 'components/layout/LoadingScreen';
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
import DevelopersScreen from 'components/company/developers/DevelopersScreen';
import SearchDeveloperScreen from 'components/company/search/SearchDeveloperScreen';

import { Stack } from '@chakra-ui/react';
import TopTenTechnologies from 'components/technologies/TopTenTechnologies';
import ChatScreen from 'components/messages/ChatScreen';
import ConversationScreen from 'components/messages/ConversationScreen';
import ConfigurationScreen from 'components/company/configuration/ConfigurationScreen';

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


                        <Route path='myoffers' element={ <CompanyOffersScreen /> } />
                        <Route path='newjob' element={<NewJobOfferScreen /> } />

                        <Route path='myoffers/:id' element={ <JobOfferScreen /> } />

                        <Route path='technologies' element={  <TechnologiesSearchScreen /> } />
                        <Route path='technologies/top10' element={ <TopTenTechnologies />} />
                        <Route path='technologies/:name' element={ <TechnologyScreen />} />


                        <Route  path='developers' element={<DevelopersScreen /> }/>

                        <Route path='messages/' element={ <ChatScreen /> }>
                           <Route path='id/:id' element={<ConversationScreen />} />
                        </Route>

                        <Route path='search' element={ <SearchDeveloperScreen />  } />
                        <Route path='search/:id' element={ <SearchDeveloperProfileScreen /> }/>

                        <Route path='config' element={ <ConfigurationScreen /> } />

                        <Route path='*' element={<Navigate to='/co' />} />
                     </Routes>

                  </>
               )
         }
      </Stack>
   );
};

export default CompanyRoutes;
