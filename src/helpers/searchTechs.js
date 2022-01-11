


const filterTechs = (allTechs, type, name) => {

   console.log({allTechs, type, name});
   let filteredTechs;
   name = name.toLowerCase();

   if(type === 'Todas') {
      filteredTechs = allTechs.filter(tech => tech.name.toLowerCase().indexOf(name) >= 0);
   }
   else {
      filteredTechs =  allTechs.filter(tech => tech.name.toLowerCase().indexOf(name) >= 0 && tech.type === type);
   }

   return filteredTechs;
};


export const sortByName = (techs) => techs.sort((a, b) => a.name.localeCompare(b.name));



export const sortByPopularity = (techs) => techs.sort((a, b) =>  b.timesRequested - a.timesRequested);
   




export const searchTechs = (type, name, allTechsAvailable, sortBy = 'Popularity') => {

   // Por defecto, tras cada búsqueda, pone los resultados ordenados por popularidad
   if(type === 'Todas' && name === ''){
      if(sortBy === 'Name') {
         return sortByName(allTechsAvailable);
      } else {
         return sortByPopularity(allTechsAvailable);
      }
   }

   else {
      const aux = filterTechs(allTechsAvailable, type, name);


      if(sortBy === 'Name') {
         return sortByName(aux);
      } else {
         return sortByPopularity(aux);
      }
   }
};