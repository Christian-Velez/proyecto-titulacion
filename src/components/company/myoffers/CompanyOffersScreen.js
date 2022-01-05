

import React from 'react';
import { useSelector } from 'react-redux';

const CompanyOffersScreen = () => {
   const { jobs } = useSelector(state => state.companyInfo);

   return (
      <div>

         {
            jobs.map(job => 
            <div key={job.id}
               style={{
                  width: '50%',
                  marginBottom: '50px'
               }}
            >
               <h3>{job.title}</h3>
               <p>{job.description}</p>
            </div>)
         }
      </div>
   );
};

export default CompanyOffersScreen;
