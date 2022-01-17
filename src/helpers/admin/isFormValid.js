
export const isTechnologyFormValid = ({ name, description, type, categories }) => {

   if (!name || !description || !type || !categories || categories.length === 0) {
      return false;
   }

   return true;
};