


export const transformTechnologiesFormat = (technologies) => {
   const auxTechs = technologies.map(
      (tech) => {
         const { id, name } = tech;
         return {
            value: id,
            label: name,
         };
      }
   );
   return auxTechs;
};