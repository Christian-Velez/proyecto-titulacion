import { useSelector } from 'react-redux';
import { useForm } from 'hooks/useForm';
import { useState } from 'react';


export const useEditDeveloperProfile = () => {
   const devInfo = useSelector(state => state.devInfo);

   const [ formValues, handleInputChange ] = useForm({
      name: devInfo.name,
      location: devInfo.location,
      description: devInfo.description,
   });
   const { name, location, description } = formValues;


   const [specialFormInfo, setSpecialFormInfo ] = useState({
      technologies: devInfo.technologies,
      selectedSofts: devInfo.softskills,
      projects: devInfo.projects,
      education: devInfo.education,
      certifications: devInfo.certifications,
      profilePhoto: devInfo.img
   });

   const handleInputSet = (inputName, value) => {
      setSpecialFormInfo({
         ...specialFormInfo,
         [inputName]: value
      });
   };

   return {
      devInfo: {
         name,
         location,
         description,
         ...specialFormInfo
      },   
      handleInputChange,
      handleInputSet
   };
};
