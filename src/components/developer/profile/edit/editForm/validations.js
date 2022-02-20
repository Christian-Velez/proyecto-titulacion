

import { isURL, isEmpty } from 'validator';


export const isProjectValid = (projectInfo) => {
   const { projectImg, name, ghLink, demoLink} = projectInfo;

   if(!projectImg) {
      return {
         isValid: false,
         message: 'Adjunta una imagen'
      };
   }
  
   if(isEmpty(name)) {
      return {
         isValid: false,
         message: 'Ingresa un nombre'
      };
   }

   if(isEmpty(ghLink)){
      return {   
         isValid: false,
         message: 'Ingresa el link del repositorio'
      };
   }

   if(!isURL(ghLink)){
      return {
         isValid: false,
         message: 'Ingresa un link de repositorio válido'
      };
   }

   
   if(!isEmpty(demoLink) && !isURL(demoLink)) {
      return {
         isValid: false,
         message: 'El demo no es un link'
      };
   }

   return {
      isValid: true
   };
};