import React from 'react';
import Layout from 'components/layout';
import ToHireList from './ToHireList';
import {
   Tab,
   TabList,
   TabPanel,
   TabPanels,
   Tabs,
} from '@chakra-ui/react';
import EmployeesList from './EmployeesList';

const DevelopersScreen = () => {
   return (
      <Layout title='Programadores'>
         <Tabs w='full' colorScheme='brandPrimaryPurple'>
            <TabList>
               <Tab>Por contratar</Tab>
               <Tab>Contratados</Tab>
            </TabList>

            <TabPanels>
               <TabPanel>
                  <ToHireList />
               </TabPanel>
               <TabPanel>
                  <EmployeesList />
               </TabPanel>
            </TabPanels>
         </Tabs>
      </Layout>
   );
};

DevelopersScreen.propTypes = {};

export default DevelopersScreen;
