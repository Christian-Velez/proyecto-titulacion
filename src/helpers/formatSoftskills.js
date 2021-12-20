


// Le da el formato a las softskills para ser utilizadas en el SpecialSelect. Vease el componente -> EditDeveloperProfile


export const formatSoftskills = (softskills) => {

   const formatedSoft = softskills.map(soft => { 
      const { id, name } = soft;
      return {
         value: id,
         label: name
      };
   });

   return formatedSoft;

};