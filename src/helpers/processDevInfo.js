import { imgUpload } from './imgUpload';


// Utilizado al momento de actualizar el perfil de un desarrollador
export const processDevInfo = async (devInfo) => {
   // El try catch esta en las funciones superiores que utilizan esta func
   let {
      profilePhoto,
      name,
      location,
      description,
      technologies,
      projects,
      education,
      certifications,
      selectedSofts,
   } = devInfo;
   //debugger;

   // Si elige una pp nueva, la sube a cloudinary
   if (typeof profilePhoto !== 'string') {
      profilePhoto = await imgUpload(
         profilePhoto
      );
   }

   // Formatear las tecnologias -> extrae techId y yearsOfExperience
   technologies = technologies.map((techObj) => {
      const { technology, yearsOfExperience } =
         techObj;
      return {
         technology: technology.id,
         yearsOfExperience,
      };
   });

   // Formatear proyectos -> sube el archivo y retorna el link
   projects = await Promise.all(
      projects.map(async (project) => {
         let { img, linkDemo, linkGH, title } = project;

         if (typeof img !== 'string') {
            img = await imgUpload(img);
         }

         return {
            img,
            title,
            linkDemo,
            linkGH,
         };
      })
   );

   
   // Formatear certificaciones -> sube el archivo y retorna el link
   certifications = await Promise.all(
      certifications.map(async (cert) => {
         let { img, ...rest } = cert;
         
         if (typeof img !== 'string') {
            img = await imgUpload(img);
         }

         return {
            img,
            ...rest
         };
      })
   );




   // Formatear soft skills -> extrae solo el id
   selectedSofts = selectedSofts.map(
      (soft) => soft.value
   );

   return {
      profilePhoto,
      name,
      location,
      description,
      technologies,
      projects,
      education,
      certifications,
      selectedSofts,
   };
};
