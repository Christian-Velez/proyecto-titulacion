

export const findJobById = (allJobs, id) => {
   return allJobs.find(job => job.id === id);
};