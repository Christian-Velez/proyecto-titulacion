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


import { Stack } from '@chakra-ui/react';

const CompanyRoutes = () => {
   const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      dispatch(startSettingCompanyInfo(setIsLoading));
      dispatch(startLoadingTechnologies());
      dispatch(startLoadingSoftSkills());
   }, []);


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
                     <Route path='/' element={<WelcomeCompany />} />

                     <Route path='profile' element={<CompanyProfile />}/>
                     <Route path='profile/edit' element={ <EditCompanyProfileScreen /> } />


                     <Route path='newjob' element={<p> aqui si quieres hacer una nueva pa </p> } />

                     <Route path='myoffers' element={ <p>aqui todas tus ofertas pa</p> } />

                     <Route path='technologies' element={  <TechnologiesSearchScreen /> } />
                     <Route path='technologies/:name' element={ <TechnologyScreen />} />


                     <Route  path='developers' element={<p>aqui van los contratados y por contratar </p> }/>

                     <Route path='messages' element={<p> aqui van los mensages </p> } />

                     <Route path='search' element={ <p> Aqui va el buscador de desarrolladores </p>  } />

                     <Route path='*' element={<Navigate to='/co' />} />
                  </Routes>

               </>
            )
         }
      </Stack>
   );
};

export default CompanyRoutes;
