


const filterTechs = (allTechs, type, name) => {
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
   




export const searchTechs = (type, name, allTechsAvailable, setFilteredTechs, sortBy = 'Popularity') => {

   // Por defecto, tras cada búsqueda, pone los resultados ordenados por popularidad
   if(type === 'Todas' && name === ''){
      if(sortBy === 'Name') {
         setFilteredTechs(sortByName([...allTechsAvailable]));
      } else {
         setFilteredTechs(sortByPopularity([...allTechsAvailable]));

      }
   }

   else {
      const aux = filterTechs(allTechsAvailable, type, name);


      if(sortBy === 'Name') {
         setFilteredTechs(sortByName([...aux]));
      } else {
         setFilteredTechs(sortByPopularity([...aux]));
      
      }
   }
};