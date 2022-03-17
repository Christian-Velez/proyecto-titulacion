



// Formatear las tecnologias -> extrae techId y yearsOfExperience
// Utilizado en PostNewJob y EditTechProfile
export const formatTechnologies = (technologies) => {

   let formatedTechs = [];

   technologies.forEach((techObj) => {

      const { technology, yearsOfExperience } = techObj;

      if(technology) {
         formatedTechs.push({
            technology: technology.id,
            yearsOfExperience,
         });

      }
   });

   return formatedTechs;
};