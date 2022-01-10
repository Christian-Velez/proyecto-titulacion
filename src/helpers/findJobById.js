

export const findJobById = (allJobs, id) => {
   return allJobs.find(tech => tech.id === id);
};