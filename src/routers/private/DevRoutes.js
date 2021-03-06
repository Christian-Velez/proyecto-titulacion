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
import { startSettingDevInfo } from 'actions/developer/user';


// Components
import SideBar from 'components/navbar/SideBar';
import LoadingScreen from 'components/layout/LoadingScreen';

import TechnologyScreen from 'components/technologies/TechnologyScreen';
import TechnologiesSearchScreen from 'components/technologies/TechnologiesSearchScreen';

import WelcomeDeveloper from 'components/developer/WelcomeDeveloper';
import DeveloperProfileScreen from 'components/developer/profile/DeveloperProfileScreen';
import EditDeveloperProfile from 'components/developer/profile/edit/EditDeveloperProfileScreen';
import SearchJobScreen from 'components/developer/jobs/SearchJobScreen';
import JobScreen from 'components/developer/jobs/jobscreen/JobScreen';
import ApplicationsScreen from 'components/developer/applications/ApplicationsScreen';
import SearchCompanyProfileScreen from 'components/developer/search/SearchCompanyProfileScreen';


import { Stack } from '@chakra-ui/react';
import SearchCompanyScreen from 'components/developer/search/SearchCompanyScreen';
import TopTenTechnologies from 'components/technologies/TopTenTechnologies';
import ChatScreen from 'components/messages/ChatScreen';
import ConversationScreen from 'components/messages/ConversationScreen';


const DevRoutes = () => {
   const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(true);

   // Carga toda la informacion inicial necesaria
   useEffect(() => {
      Promise.all([
         dispatch(startSettingDevInfo()),
         dispatch(startLoadingTechnologies()),
         dispatch(startLoadingSoftSkills()),
      ])
         .then(() => setIsLoading(false))
         .catch((err) => console.log(err));
   }, [ dispatch ]);


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
               
                        <Route path='/welcome' element={ <WelcomeDeveloper /> } />
               
                        <Route path='profile' element={ <DeveloperProfileScreen /> } />
                        <Route path='profile/edit' element={ <EditDeveloperProfile /> } />

                        <Route path='jobs/' element={ <SearchJobScreen /> }>
                           <Route path='id/:id' element={<JobScreen />} />
                        </Route>

                        <Route path='technologies' element={ <TechnologiesSearchScreen/> } />
                        
                        <Route path='technologies/top10' element={ <TopTenTechnologies /> } />

                        <Route path='technologies/:name' element={ <TechnologyScreen/>} />

                        <Route path='applications/' element={ <ApplicationsScreen /> }>
                           <Route path='id/:id' element={<JobScreen />} />
                        </Route>

                        <Route path='messages/' element={ <ChatScreen /> }>
                           <Route path='id/:id' element={<ConversationScreen />} />
                        </Route>

                        <Route path='search' element={ <SearchCompanyScreen /> } />
                        <Route path='search/:id' element={ <SearchCompanyProfileScreen />} />
                        
                        <Route path='*' element={ <Navigate to='/dev/welcome' /> }  />
               
                     </Routes>
                  </>
               )

         }

      </Stack>
   );
};

export default DevRoutes;
