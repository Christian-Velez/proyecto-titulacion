import Swal from 'sweetalert2';
import validator from 'validator';

export const isRegisterFormValid = ({
   name,
   username,
   password,
   location = null,
}) => {
   let regExp =
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;

   if (!regExp.test(name)) {
      Swal.fire({
         icon: 'error',
         title: 'Error...',
         text: 'Utiliza solo letras y espacios en tu nombre',
         confirmButtonColor:
            'var(--chakra-colors-brand-500)',
      });
      return false;
   }

   if (!validator.isAlphanumeric(username)) {
      Swal.fire({
         icon: 'error',
         title: 'Error...',
         text: 'Utiliza solo caracteres alfanuméricos en tu nombre de usuario',
         confirmButtonColor:
            'var(--chakra-colors-brand-500)',
      });
      return false;
   }

   if (!validator.isStrongPassword(password)) {
      Swal.fire({
         icon: 'error',
         title: 'Error...',
         text: 'Proporciona una contraseña lo suficientemente segura',
         confirmButtonColor:
            'var(--chakra-colors-brand-500)',
      });
      return false;
   }

   if (location && validator.isEmpty(location)) {
      Swal.fire({
         icon: 'error',
         title: 'Error...',
         text: 'Ingresa una localización válida',
         confirmButtonColor:
            'var(--chakra-colors-brand-500)',
      });
      return false;
   }

   return true;
};
