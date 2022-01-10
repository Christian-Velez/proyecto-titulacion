


//export const findTechnologyById = (allTechs, id) => {


//};


export const findTechnologyByName = (allTechs, name) => {
   return allTechs.find(tech => tech.name.toLowerCase() === name.toLowerCase());
};