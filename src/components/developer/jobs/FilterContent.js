


import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, CheckboxGroup, Heading, HStack, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Text, VStack } from '@chakra-ui/react';
import { techCategories } from 'helpers/appCategories';
import { FaDollarSign } from 'react-icons/fa';

const FilterContent = ({ filters, setFilters }) => {

   const { salary, categories } = filters;


   const handleCategories = (values) => {
      setFilters({
         ...filters,
         categories: values
      });
   };

   const handleSalary = (values) => {
      setFilters({
         ...filters,
         salary: values
      });
   };




   return (
      <VStack spacing={10} alignItems='flex-start'>
         <Heading fontSize='lg'>Filtros</Heading>
         {/*Categoria*/}

         <VStack
            spacing={5}
            alignItems='flex-start'
         >
            <Heading fontSize='md'>
               Categoría
            </Heading>
            <CheckboxGroup 
               colorScheme='brand' 
               value={categories}
               onChange={ handleCategories }>
               
               
               <VStack alignItems='flex-start'>
                  {techCategories.map((tech) => (
                     <Checkbox
                        key={tech.value}
                        value={tech.value}
                        colorScheme='brandPrimary'
                     >
                        {tech.label}
                     </Checkbox>
                  ))}
               </VStack>
            </CheckboxGroup>
         </VStack>

         {/*Salario*/}

         <VStack
            spacing={5}
            alignItems='flex-start'
            w='full'
         >
            <Heading fontSize='md'>
               Salario mensual (USD)
            </Heading>

            <RangeSlider
               aria-label={['min', 'max']}
               colorScheme='blue'
               defaultValue={[salary[0], salary[1]]}
               
               min={0}
               step={500}
               max={5000}
            
               onChangeEnd={ handleSalary}
            >
               <RangeSliderTrack>
                  <RangeSliderFilledTrack />
               </RangeSliderTrack>
               <RangeSliderThumb index={0} />
               <RangeSliderThumb index={1} />
            </RangeSlider>

            <HStack justifyContent='space-between' w='full'>
               <HStack spacing={0}>
                  <FaDollarSign />
                  <Text> {salary[0] / 1000}K</Text>
               </HStack>
               
               <HStack spacing={0}>
                  <FaDollarSign />
                  <Text> {salary[1] / 1000}K</Text>
               </HStack>

            </HStack>
         </VStack>
      </VStack>
   );
};

FilterContent.propTypes = {
   filters: PropTypes.object,
   setFilters: PropTypes.func
};

export default FilterContent;
