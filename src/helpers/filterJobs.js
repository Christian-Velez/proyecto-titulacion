


// Utilizado en el buscador de trabajos para desarrolladores



export const filterJobs = (allJobs, filters) => {

   let { salary, categories, title } = filters;

   // Lo pasa a minusculas y le quita los espacios
   title = title.toLowerCase().replace(/ /g, '');

   const filteredJobs = allJobs.filter(job => {
      
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
         && 
         job.title.toLowerCase().indexOf(title) >= 0
      ); 
   });




   return filteredJobs;

};