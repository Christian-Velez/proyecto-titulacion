import Swal from 'sweetalert2';



export const successAlert = ({title = 'Hecho',message }) => {
   Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      confirmButtonColor:
         'var(--chakra-colors-brand-500)',
   });
};

export const errorAlert = ({title = 'Error...', message }) => {
   Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonColor:
         'var(--chakra-colors-brand-500)',
   });
};