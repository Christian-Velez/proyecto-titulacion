import React from 'react';
import { useSelector } from 'react-redux';
import { Text, VStack } from '@chakra-ui/react';
import JobItem from './JobItem';

const RecommendedJobs = () => {

   const { recommendedJobs } = useSelector(state => state.devJobs) || [];

   return recommendedJobs?.length === 0 ? (
      <Text mt={5}>
         No se encontraron trabajos sugeridos,
         intenta ampliar tu stack de tecnologías o
         revisar la sección {'"Todos"'}.
      </Text>
   ) : (
      <VStack
         spacing={5}
         w='100%'
      >
         {recommendedJobs?.map((job) => (
            <JobItem
               key={job.id}
               job={job}
            />
         ))}
      </VStack>
   );
};


export default RecommendedJobs;
