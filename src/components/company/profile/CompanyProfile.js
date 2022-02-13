
import CompanyProfileContent from 'components/profiles/company/CompanyProfileContent';
import { useSelector } from 'react-redux';

const CompanyProfile = () => {
   
   // Se utiliza para seleccionar la info del store del lado de la compañia
   const companyInfo = useSelector(state => state.companyInfo);


   return (
      <CompanyProfileContent companyInfo={ companyInfo } />
   );
};

export default CompanyProfile;
