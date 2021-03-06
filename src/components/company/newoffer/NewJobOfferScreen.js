import React, { useState } from 'react';
import useScrollToTop from 'hooks/useScrollToTop';

import {
   FormControl,
   FormHelperText,
   FormLabel,
   Input,
   InputGroup,
   InputLeftElement,
   Select,
   Textarea,
   VStack,
} from '@chakra-ui/react';
import BasicInput from 'components/forms/BasicInput';
import { useForm } from 'hooks/useForm';
import { Select as SpecialSelect } from 'chakra-react-select';


import { techCategories } from 'helpers/appCategories';
import Technologies from 'components/forms/Technologies';
import Buttons from 'components/forms/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { formatSoftskills } from 'helpers/formatSoftskills';
import { startPostingNewJob } from 'actions/company/job';
import { useNavigate } from 'react-router-dom';
import { formatTechnologies } from 'helpers/formatTechnologies';
import Layout from 'components/layout';

const NewJobOfferScreen = () => {
   useScrollToTop();

   const navigate = useNavigate();
   const dispatch = useDispatch();

   // Obtener todos los datos disponibles en la BD
   const { softskills } = useSelector(state => state.soft);   
   const [softsHere] = useState(formatSoftskills([...softskills]));



   // Datos de la nueva oferta
   const [formValues, handleInputChange] =
      useForm({
         title: '',
         description: '',
         salary: '',
         additional: '',
         category: techCategories[0].value
      });
   const { title, description, salary, additional, category } = formValues;
   const [selectedTechs, setSelectedTechs] = useState([]);
   const [selectedSofts, setSelectedSofts] = useState([]);
 

   const handleSubmit = async (e) => {
      e.preventDefault();

      const newJobInfo = {
         title,
         description,
         category,
         additional,
         salary: parseInt(salary),
         techsRequired: formatTechnologies(selectedTechs),
         softsRequired: selectedSofts.map(soft => soft.value)
      };
      dispatch(startPostingNewJob(newJobInfo, navigate));
   };

   return (
      <Layout
         title='Publicar oferta'
         padding={{ base: 10, lg: 30, xl: 40 }}
      >
         <form
            onSubmit={handleSubmit}
            style={{ width: '100%' }}
         >
            <VStack
               alignItems='flex-start'
               spacing={8}
               w={{ base: 'full', lg: '60%' }}
            >
               <BasicInput
                  text='T??tulo'
                  name='title'
                  value={title}
                  onChange={handleInputChange}
                  maxLength={50}
                  helperText='Aseg??rate de que sea descriptivo, los postulantes buscar??n la oferta haciendo referencia al t??tulo.'
               />

               <FormControl isRequired>
                  <FormLabel fontSize='lg'>
                     Descripci??n
                  </FormLabel>
                  <Textarea
                     type='text'
                     name='description'
                     value={description}
                     onChange={handleInputChange}
                     maxLength={2000}
                     h='200px'

                  />               
                  <FormHelperText> Detalles adicionales. </FormHelperText>
               </FormControl>

               <FormControl isRequired>
                  <FormLabel fontSize='lg'>
                     Categor??a
                  </FormLabel>
                  <Select
                     name='category'
                     value={category}
                     onChange={handleInputChange}
                  >
                     {
                        techCategories.map((cat, i) => <option key={i}> {cat.label} </option> )
                     }
                  </Select>
                  <FormHelperText>
                     El enfoque principal de la vacante.
                  </FormHelperText>
               </FormControl>

               <FormControl isRequired>
                  <FormLabel fontSize='lg'>Sueldo mensual estimado (USD)</FormLabel>
                  <InputGroup>
                     <InputLeftElement
                        pointerEvents='none'
                        color='gray.300'
                        fontSize='1.2em'
                     >
                        $
                     </InputLeftElement>
                     <Input 
                        type='number' 
                        min={0} name='salary'
                        value={salary}
                        onChange={handleInputChange}
                     />
                  </InputGroup>
               </FormControl>

               <Technologies technologies={selectedTechs} setTechnologies={setSelectedTechs}/>

               <FormControl>
                  <FormLabel fontSize='lg'>Soft skills</FormLabel>
                  {softsHere && (
                     <SpecialSelect
                        isMulti
                        name='mySoftskills'
                        placeholder='Seleccione las soft skills requeridas...'
                        closeMenuOnSelect={false}
                        selectedOptionStyle='check'
                        hideSelectedOptions={false}

                        options={softsHere}
                        value={selectedSofts}
                        onChange={setSelectedSofts}
                     />
                  )}
               </FormControl>  


               <BasicInput 
                  text='Extras' 
                  isRequired={false}
                  helperText='Requerimientos no indispensables para la vacante.'
                  placeholder='Ingl??s conversacional'

                  name='additional'
                  value={additional}
                  onChange={handleInputChange}


               />


               <Buttons actionText='Publicar' cancelRoute='/co/myoffers'/>

            </VStack>
         </form>
      </Layout>
   );
};

export default NewJobOfferScreen;
