import EditProfileButton from 'components/layout/EditProfileButton';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Layout from 'components/layout';
import MainInfo from '../MainInfo';
import Body from './Body';

const CompanyProfileContent = ({
   companyInfo,
}) => {

   
   const navigate = useNavigate();

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   const handleEditProfile = () => {
      navigate('./edit');
   };

   const { id } = useSelector((state) => state.auth);
   const isMyProfile = id === companyInfo.id;

   return (
      <Layout
         padding={{ base: 10, lg: 30, xl: 40 }}
      >
         <>
            {/*Header informacion principal*/}
            <MainInfo userInfo={companyInfo}/>
            {
               isMyProfile && <EditProfileButton handleEditProfile={handleEditProfile} />
            }
         
            <Body companyInfo={ companyInfo }/>
         </>

      </Layout>
   );
};



CompanyProfileContent.propTypes = {
   companyInfo: PropTypes.object
};

export default CompanyProfileContent;
