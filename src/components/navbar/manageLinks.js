// Variables utilizadas en el componente navbar
// para que se pueda reutilizar

// index -> campo utilizado como Key al renderizar componentes con la funcion map()
// path -> se utiliza para redirigir. El path parte desde 'localhost:300/'
// name -> etiqueta mostrada en el menu de navegacion
// icon -> componente icono que se renderiza
import { Icon } from '@chakra-ui/icons';

import { AiFillHome } from 'react-icons/ai';
import { GiSkills } from 'react-icons/gi';
import { BiSearch } from 'react-icons/bi';
import {
   IoMdBriefcase,
   IoIosChatbubbles,
} from 'react-icons/io';
import {
   FaGitAlt,
   FaUsers,
} from 'react-icons/fa';

import { MdOutlineAddCircleOutline } from 'react-icons/md';

const manageLinks = {
   Admin: [
      {
         index: 1,
         path: '/admin',
         name: 'Inicio',
         icon: (
            <Icon as={AiFillHome} h={5} w={5} />
         ),
      },
      {
         index: 2,
         path: '/admin/technologies',
         name: 'Tecnologías',
         icon: <Icon as={FaGitAlt} h={5} w={5} />,
      },
      {
         index: 3,
         path: '/admin/soft-skills',
         name: 'Soft skills',
         icon: <Icon as={GiSkills} h={5} w={5} />,
      },
   ],

   Developer: [
      {
         index: 1,
         path: '/dev',
         name: 'Inicio',
         icon: (
            <Icon as={AiFillHome} h={5} w={5} />
         ),
      },
   
      {
         index: 3,
         path: '/dev/jobs',
         name: 'Empleos',
         icon: (
            <Icon
               as={IoMdBriefcase}
               h={5}
               w={5}
            />
         ),
      },
      {
         index: 4,
         path: '/dev/technologies',
         name: 'Tecnologías',
         icon: <Icon as={FaGitAlt} h={5} w={5} />,
      },
      {
         index: 5,
         path: '/dev/applications',
         name: 'Postulaciones',
         icon: <Icon as={FaUsers} h={5} w={5} />,
      },
      {
         index: 6,
         path: '/dev/messages',
         name: 'Chat',
         icon: (
            <Icon
               as={IoIosChatbubbles}
               h={5}
               w={5}
            />
         ),
      },
      {
         index: 7,
         path: '/dev/search',
         name: 'Buscador',
         icon: <Icon as={BiSearch} h={5} w={5} />,
      },
   ],
   Company: [
      {
         index: 1,
         path: '/co',
         name: 'Inicio',
         icon: (
            <Icon as={AiFillHome} h={5} w={5} />
         ),
      },
      {
         index: 3,
         path: '/co/newjob',
         name: 'Publicar oferta',
         icon: (
            <Icon
               as={MdOutlineAddCircleOutline}
               h={5}
               w={5}
            />
         ),
      },
      {
         index: 4,
         path: '/co/myoffers',
         name: 'Mis ofertas',
         icon: (
            <Icon
               as={IoMdBriefcase}
               h={5}
               w={5}
            />
         ),
      },
      {
         index: 5,
         path: '/co/technologies',
         name: 'Tecnologías',
         icon: <Icon as={FaGitAlt} h={5} w={5} />,
      },
      {
         index: 6,
         path: '/co/developers',
         name: 'Programadores',
         icon: <Icon as={FaUsers} h={5} w={5} />,
      },
      {
         index: 7,
         path: '/co/messages',
         name: 'Chat',
         icon: (
            <Icon
               as={IoIosChatbubbles}
               h={5}
               w={5}
            />
         ),
      },
      {
         index: 8,
         path: '/co/search',
         name: 'Buscador',
         icon: <Icon as={BiSearch} h={5} w={5} />,
      },
   ],
};

export default manageLinks;
