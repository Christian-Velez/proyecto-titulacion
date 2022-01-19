
// Funciones utilizadas en TechnologiesSearchScreen

const filterTechs = (allTechs, type, name) => {
   name = name.toLowerCase();

   if(type === 'Todas') {
      return allTechs.filter(tech => tech.name.toLowerCase().indexOf(name) >= 0);
   }
   else {
      return allTechs.filter(tech => tech.name.toLowerCase().indexOf(name) >= 0 && tech.type === type);
   }
};



export const sortByName = (techs) => techs.sort((a, b) => a.name.localeCompare(b.name));
export const sortByPopularity = (techs) => techs.sort((a, b) =>  b.timesRequested - a.timesRequested);
   

export const searchTechs = (type, name, allTechsAvailable, sortBy = 'Popularity') => {

   if(type === 'Todas' && name === ''){
      if(sortBy === 'Name') {
         return sortByName(allTechsAvailable);
      }
      
      return sortByPopularity(allTechsAvailable);
   }

   else {
      const aux = filterTechs(allTechsAvailable, type, name);


      if(sortBy === 'Name') {
         return sortByName(aux);
      }
      
      return sortByPopularity(aux);
   }
};