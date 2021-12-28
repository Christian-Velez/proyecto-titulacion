import { Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
   Navigate,
   Route,
   Routes,
} from 'react-router-dom';
import SideBar from 'components/navbar/SideBar';
import { useDispatch } from 'react-redux';
import { startLoadingSoftSkills } from 'actions/admin/softskills';
import { startLoadingTechnologies } from 'actions/admin/technologies';
import { startSettingCompanyInfo } from 'actions/company/user';
import LoadingScreen from 'components/LoadingScreen';
import WelcomeCompany from 'components/company/WelcomeCompany';

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

      >
         {
            isLoading
            ? <LoadingScreen />
            : (
               <>               
                  <SideBar />
                  <Routes>
                     <Route path='/' element={<WelcomeCompany />} />

                     <Route path='profile' element={<p>aqui va tu perfil pa</p>}/>

                     <Route path='newjob' element={<p> aqui si quieres hacer una nueva pa </p> } />

                     <Route path='myoffers' element={ <p>aqui todas tus ofertas pa</p> } />

                     <Route path='technologies' element={  <p>Aqui van las tecnologías </p> } />

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
