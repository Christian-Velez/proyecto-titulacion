//import Layout from 'components/layout';
//import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const SearchCompanyProfileScreen = () => {
   //const [devInfo, setDevInfo] = useState({});
   //const [isLoading, setIsLoading] = useState(true);
   //const [error, setError] = useState(false);
   const { id } = useParams();

   console.log(id)


  return (
    <div>SearchCompanyProfileScreen
    </div>
  )
}

export default SearchCompanyProfileScreen