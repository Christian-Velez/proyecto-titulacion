

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

   const reqs = techsRequired.length;
   let reqsMet = 0;


   for(let i = 0; i < techsRequired.length; i++) {

      const rest = devStack.find(
         tech =>
            (tech.technology === techsRequired[i].technology)
      );

      if(rest) {
         reqsMet++;
      }
   }

   return Math.floor(reqsMet / reqs * 100);
};





