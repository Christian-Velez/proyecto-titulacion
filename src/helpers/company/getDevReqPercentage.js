

// Obtener el porcentaje de requerimientos cumplidos en una oferta
// Componente -> JobOfferScreen


export const getDevReqPercentage = (technologies, devStack) => {
   const techsRequired = technologies.map(tech => {
      const { technology, yearsOfExperience } = tech;

      return {
         technology: technology?.id,
         yearsOfExperience
      };
   });

   const reqs = techsRequired.length * 2;
   let reqsMet = 0;


   for(let i = 0; i < techsRequired.length; i++) {

      const currentDevTech = devStack.find(
         tech =>
            (tech.technology === techsRequired[i].technology)
      );

      console.log({ currentDevTech, companyTech: techsRequired[i] });
   
      // Tiene la tecnologia?
      if(currentDevTech) {
         reqsMet++;
      }
   
      // Cumple con los años de experiencia?
      if(currentDevTech?.yearsOfExperience >= techsRequired[i]?.yearsOfExperience) {
         reqsMet++;
      }
      
      
   }

   return Math.floor(reqsMet / reqs * 100);
};





