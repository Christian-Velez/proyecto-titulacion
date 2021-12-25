


const filterTechs = (allTechs, type, name) => {
   let filteredTechs;
   name = name.toLowerCase();

   if(type === 'Todas') {
      filteredTechs = allTechs.filter(tech => tech.name.toLowerCase().indexOf(name) >= 0);
   }
   else {
      filteredTechs =  allTechs.filter(tech => tech.name.toLowerCase().indexOf(name) >= 0 && tech.type === type);
   }

   return sortByName(filteredTechs);
};


export const sortByName = (techs) => techs.sort((a, b) => a.name.localeCompare(b.name));
export const sortByPopularity = (techs) => techs.sort((a, b) =>  b.timesRequested - a.timesRequested);

export const searchTechs = (type, name, allTechsAvailable, setTechs) => {
   if(type === 'Todas' && name === ''){
      setTechs(sortByPopularity(allTechsAvailable));
   }

   else if(type === 'Todas' && name !== ''){
      const aux = filterTechs(allTechsAvailable, type, name);
      setTechs(aux);
   }
};