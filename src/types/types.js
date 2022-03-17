


// '[Reducer name] name'

export const types = {
   // General
   generalLogout: '[Root] Clean all stored data',
   login: '[Auth] Login',
   logout: '[Auth] Logout',
   setChecking: '[Auth] Update checking state',

   uiSetError: '[UI] Set error',
   uiRemoveError: '[UI] Remove errror',
   uiStartLoading: '[UI] Set UI state to loading...',
   uiFinishLoading: '[UI] Finish loading',

   setAccountType: '[Register] Set account type',
   cleanRegisterState: '[Register] Clean all register fields',


   // Admin
   setTechnologies: '[Tech] Set technologies in stored data',
   addNewTech: '[Tech] Add new technology to stored data',
   editTech: '[Tech] Edit technology fields in stored data',
   deleteTech: '[Tech] Delete tech from stored data',

   setSoftSkills: '[Soft] Set soft-skills in stored data' ,
   addNewSoft: '[Soft] Add new soft-skill to stored data',
   editSoft: '[Soft] Edit soft-skill fields in stored data',
   deleteSoft: '[Soft] Delete soft-skill from stored data',



   // Developer
   addNewTechToDevStack: '[Dev] Add new tech to dev stack',
   setDevInfo: '[Dev] Set developer user info: name, id, etc.',
   setAllJobs: '[DevJobs] Set all jobs in stored data',
   updateJobInfo: '[DevJobs] Update one job info',
   setIsJobSelected: '[DevJobs] Set true or false job isselect',
   setRecommendedJobs: '[DevJobs] Set recommended jobs from backend',


   // Company
   setCompanyInfo: '[Company] Set company info: name, id, etc.',
   addNewJobOffer: '[Company] Add new posted offer to stored data',
   updateJob: '[Company] Update job in stored data',
   removeApplicantFromJob: '[Company] Remove developer applicant from company jobs',
   discardDeveloper: '[Company] Discard developer from toHire list',
   hireDeveloper: '[Company] Hire developer',
   fireDeveloper: '[Company] Fire developer'
   
};