


// Rangos de años de experiencia
const RANGES = [
   {
      min: 0,
      max: 0,
   },
   {
      min: 1,
      max: 3
   },
   {
      min: 4,
      max: 8,
   },
   {
      min: 9,
      max: 30
   }
];


const getRange = (num) => {
   for(let i = 0; i < RANGES.length; i++) {
      const RANGE = RANGES[i];
      if(num >= RANGE.min && num <= RANGE.max ) {
         return RANGE;
      }
   }
};



export const getRecommendedJobs = (allJobs, devTechs) => {

   const techs = devTechs.map(item => {
      const { id } = item.technology || {};
      const { yearsOfExperience } = item;
      return {
         id,
         yearsOfExperience
      };
   });


   let filteredJobs = [];

   


   for(let i = 0; i < allJobs.length; i++) {
      let addJob = true;

      const job = allJobs[i];
      const { techsRequired } = job;
      // Extrae solo el ID

      // IDS de tecnologias y años 
      let techsRequiredFormated = [];

      techsRequired.forEach(item => {
         const { technology, yearsOfExperience } = item;
         
         // Extrae SOLO los trabajos que tengan tecnologias existentes
         // (por si el admin borro alguna)
         if(technology) {
            techsRequiredFormated.push({
               id: technology.id,
               yearsOfExperience
            });
         }
      });
     


      let a = 0;
      do {
         const RANGE = getRange(techs[a].yearsOfExperience);
         
         const B = a;
         const index = techsRequiredFormated.findIndex(element => element.id === techs[B].id);
         
         // Si no incluye la tecnologia...
         if(index === -1) {
            addJob = false;
            break;
         }

         // Si la incluye...

         // ¿los años de experiencia estan en el rango?
         if(!(techsRequiredFormated[index].yearsOfExperience >= RANGE.min && techsRequiredFormated[index].yearsOfExperience <= RANGE.max)) {
            addJob = false;
            break;
         }
         a++;            
      

      } while(a < techs.length && addJob);



      if(addJob) {
         filteredJobs.push(job);
      }
   }

   return filteredJobs;
};