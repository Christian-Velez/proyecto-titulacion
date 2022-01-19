



// Formatear las tecnologias -> extrae techId y yearsOfExperience
// Utilizado en PostNewJob y EditTechProfile
export const formatTechnologies = (technologies) => {
   return technologies.map((techObj) => {

      const { technology, yearsOfExperience } = techObj;
      return {
         technology: technology.id,
         yearsOfExperience,
      };
   });
};