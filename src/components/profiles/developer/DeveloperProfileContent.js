import React from 'react';
import useScrollToTop from 'hooks/useScrollToTop';
import PropTypes from 'prop-types';

import EditProfileButton from 'components/layout/EditProfileButton';
import MainInfo from '../MainInfo';
import Body from './Body';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from 'components/layout';

const DeveloperProfileContent = ({ devInfo }) => {
   useScrollToTop();
   const navigate = useNavigate();


   const handleEditProfile = () => {
      navigate('./edit');
   };

   const { id } = useSelector(
      (state) => state.auth
   );
   const isMyProfile = id === devInfo.id;

   return (
      <Layout
         padding={{ base: 10, lg: 30, xl: 40 }}
      >
         {/* Header -> Información principal del desarrollador */}
         <MainInfo userInfo={devInfo} />

         {isMyProfile && (
            <EditProfileButton
               handleEditProfile={
                  handleEditProfile
               }
            />
         )}

         {/* Body -> Información extra: calificaciones, proyectos, etc*/}
         <Body devInfo={devInfo} />
      </Layout>
   );
};

DeveloperProfileContent.propTypes = {
   devInfo: PropTypes.object,
};

export default DeveloperProfileContent;
