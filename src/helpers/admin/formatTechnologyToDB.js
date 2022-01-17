import { imgUpload } from 'helpers/imgUpload';
import Swal from 'sweetalert2';



export const formatTechnologyToDB = async ({ img, categories, relatedTechs, ...rest }) => {
   let imgURL;
   if (typeof img === 'string') {
      imgURL = img;
   } else {
      // Se sube la nueva imagen a cloudinary
      imgURL = await imgUpload(img);

      if (!imgURL) {
         return Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Ocurrio un error con la subida de la imagen',
            confirmButtonColor:
               'var(--chakra-colors-brand-500)',
         });
      }
   }

   // Si la imagen esta correcta...
   const categoriesToDB = categories.map(
      (cat) => {
         const { label } = cat;
         return label;
      }
   );

   const relatedTechsToDB =
      relatedTechs.map((tech) => {
         const { value: id } = tech;
         return id;
   });


   return {
      ...rest,
      img: imgURL,
      categories: categoriesToDB,
      relatedTechs: relatedTechsToDB
   };
};