


// Utilizado en el buscador de trabajos para desarrolladores



export const filterJobs = (allJobs, filters) => {

   let { salary, categories, title } = filters;

   // Lo pasa a minusculas y le quita los espacios
   title = title.toLowerCase().replace(/ /g, '');


   const filteredJobs = allJobs.filter(job => {

      const includesTech = 
         job.techsRequired.some(i => i.technology.name.toLowerCase().includes(title));



      return (
         // Salario
         salary[0] <= job.salary && job.salary <= salary[1]

         // Categorias
         && (
            categories.length > 0 
            ? categories.includes(job.category) 
            : job
            
         )

         // Titulo del buscador
         // Compara con titulo,
         // descripción o tecnologias

         && 
         (
            job.title.toLowerCase().indexOf(title) >= 0 ||
            job.description.toLowerCase().indexOf(title) >= 0 ||
            includesTech
         )
      ); 
   });




   return filteredJobs;

};