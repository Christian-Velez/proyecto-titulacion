
import { useSelector } from 'react-redux';
import DeveloperProfileContent from 'components/profiles/developer/DeveloperProfileContent';


const DeveloperProfileScreen = () => {

   // Se utiliza para seleccionar la info del store del lado del desarrollador
   const devInfo = useSelector((state) => state.devInfo);

   return (
      <DeveloperProfileContent devInfo={devInfo} />
   );
};

export default DeveloperProfileScreen;
