import { formatTechnologies } from 'helpers/formatTechnologies';
import { imgUpload } from '../imgUpload';


// Si elige una pp nueva, la sube a cloudinary
export const formatProfilePhoto = async (profilePhoto) => {
   if (typeof profilePhoto !== 'string') {
      return await imgUpload(profilePhoto);
   }

   return profilePhoto;
};

// Formatear proyectos -> sube la foto y retorna el link
export const formatProjects = async(projects) => {
   return await Promise.all(
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
};


// Formatear certificaciones -> sube el archivo y retorna el link
export const formatCertifications = async (certifications) => {
   return await Promise.all(
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
};


// Formatear soft skills -> extrae solo el id
const formatSoftSkills = (softskills) => softskills.map((soft) => soft.value);



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

   profilePhoto = await formatProfilePhoto(profilePhoto);
   technologies = formatTechnologies(technologies);
   projects = await formatProjects(projects);
   certifications = await formatCertifications(certifications);
   selectedSofts = formatSoftSkills(selectedSofts);

   return {
      img: profilePhoto,
      name,
      location,
      description,
      technologies,
      projects,
      education,
      certifications,
      softskills: selectedSofts,
   };
};
