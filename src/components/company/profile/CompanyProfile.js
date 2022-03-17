
import { startSettingCompanyInfo } from 'actions/company/user';
import CompanyProfileContent from 'components/profiles/company/CompanyProfileContent';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CompanyProfile = () => {
   const dispatch = useDispatch();
   useEffect(() => {
     dispatch(startSettingCompanyInfo());
   }, [dispatch]);
   
   
   // Se utiliza para seleccionar la info del store del lado de la compañia
   const companyInfo = useSelector(state => state.companyInfo);


   return (
      <CompanyProfileContent companyInfo={ companyInfo } />
   );
};

export default CompanyProfile;
