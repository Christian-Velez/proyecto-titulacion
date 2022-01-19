

// Utilizado en EditDeveloperProfile y al crear una nueva oferta
export const filterTechs = (allTechs, selectedTechs) => {

   let aux = allTechs;

   // Le quita las tecnologias que el usuario ya selecciono
   // para que no pueda agregar dos veces la misma
   aux = aux.filter(({ name: name1 }) => !selectedTechs.some(({ technology }) => name1 === technology.name));

   // Alfabeticamente      
   aux.sort((a, b) => a.name.localeCompare(b.name));
   return aux;
};