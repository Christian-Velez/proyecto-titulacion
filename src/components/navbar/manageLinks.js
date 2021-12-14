
// Variables utilizadas en el componente navbar
// para que se pueda reutilizar



// index -> campo utilizado como Key al renderizar componentes con la funcion map()
// path -> se utiliza para redirigir. El path parte desde 'localhost:300/'
// name -> etiqueta mostrada en el menu de navegacion

const manageLinks = {
   Admin: [
      {
         index: 1,
         path: '/admin/',
         name: 'Inicio',
      },
      {
         index: 2,
         path: '/admin/tecnologias',
         name: 'Tecnologías'
      },
      {
         index: 3,
         path: '/admin/soft-skills',
         name: 'Soft skills'
      },
   ],

   //Developer: [],
   //Business: [],
};

export default manageLinks;
