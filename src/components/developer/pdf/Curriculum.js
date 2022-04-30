import React from 'react';
import PropTypes from 'prop-types';
import {
   Document,
   Font,
   Image,
   Page,
   StyleSheet,
   Text,
   View,
} from '@react-pdf/renderer';
import Roboto from './roboto.ttf';


Font.register({
   family: 'Roboto',
   src: Roboto,
});

const fonts = StyleSheet.create({
   name: {
      fontSize: 19,
      textAlign: 'justify',
      fontFamily: 'Times-Roman',
   },

   description: {
      fontSize: 10,
      fontFamily: 'Roboto',
   },
});

// Create styles
const styles = StyleSheet.create({
   page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
   },
   left: {
      width: '30%',
      backgroundColor: '#454545',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '10px',
   },
   right: {
      display: 'flex',
      flexDirection: 'column',
      width: '70%',
      padding: '20px',
      backgroundColor: '#F2F5FF',
      margin: '0px',
   },

   technologyItem: {
      display: 'flex',
      flexDirection: 'row',
      margin: '10px 0px',
   },
});

const Curriculum = ({ devInfo }) => {
   return (
      <Document>
         <Page size='A4' style={styles.page}>
            <View style={styles.left}>
               <Image
                  src={devInfo.img}
                  style={{
                     width: '80%',
                  }}
               />

               <Text style={{ margin: '5px 0px' }}>
                  {devInfo.name}
               </Text>

               <Text style={{ ...fonts.description, margin: '5px auto' }}>
                  {devInfo.location}
               </Text>

               <Text style={{ marginTop: '15px', marginBottom: '5px' , fontSize: 14 }}>Acerca de mí </Text>
               <Text style={fonts.description}>
                  {devInfo.description}
               </Text>
            </View>

            <View style={styles.right}>
               <Text style={{ fontSize: 15 }}>Tecnologías</Text>
               {devInfo.technologies.map(
                  (item) => {
                     const {
                        technology,
                        _id,
                        yearsOfExperience,
                     } = item;
                     let { img, name } =
                        technology;

                     if (
                        typeof img === 'string' &&
                        img.includes('svg')
                     ) {
                        img = img.replace(
                           /svg/g,
                           'png'
                        );
                     }

                     return (
                        <View
                           key={_id}
                           style={
                              styles.technologyItem
                           }
                        >
                           {img && (
                              <Image
                                 src={img}
                                 style={{
                                    width: '20px',
                                 }}
                              />
                           )}
                           <Text style={{ ...fonts.description, marginLeft: '5px' }}>
                              {name}{' '}
                              {yearsOfExperience}{' '}
                              {yearsOfExperience ===
                              1
                                 ? 'año'
                                 : 'años'}{' '}
                              de experiencia.
                           </Text>
                        </View>
                     );
                  }
               )}

               <Text
                  style={{ marginTop: '20px', fontSize: 15}}
               >
                  Proyectos
               </Text>
               {devInfo.projects.map(
                  (project) => {
                     const {
                        _id,
                        title,
                        linkGH,
                        linkDemo,
                     } = project;

                     return (
                        <View key={_id} style={{ marginTop: '10px'}} >
                           <Text style={fonts.description}> - {title} </Text>
                           <Text style={{
                              ...fonts.description,
                              marginLeft: '10px'
                           }}>
                              {linkGH
                                 ? `Repositorio: ${linkGH}`
                                 : ''}
                           </Text>
                           <Text style={{
                              ...fonts.description,
                              marginLeft: '10px'
                           }}
                           
                           >
                              {linkDemo
                                 ? `Demo/descarga: ${linkDemo}`
                                 : ''}
                           </Text>
                        </View>
                     );
                  }
               )}

               {devInfo.education.length > 0 && (
                  <View
                     style={{ marginTop: '20px' }}
                  >
                     <Text style={{ fontSize: 15, marginBottom: '10px' }}
                     
                     >Educación</Text>

                     <View>
                        {devInfo.education.map(
                           (education) => {
                              const {
                                 title,
                                 institution,
                                 year,
                                 _id,
                              } = education;

                              return (
                                 <View key={_id}>
                                    <Text style={fonts.description}>
                                       - {title}.{' '}
                                       {
                                          institution
                                       }{' '}
                                       ({year}).
                                    </Text>
                                 </View>
                              );
                           }
                        )}
                     </View>
                  </View>
               )}

               {devInfo.certifications.length > 0 && (
                  <View
                     style={{ marginTop: '20px' }}
                  >
                     <Text style={{ fontSize: 15, marginBottom: '10px' }}>Licencias y certificaciones</Text>

                     <View>
                        {devInfo.certifications.map(
                           (certification) => {
                              const {
                                 title,
                                 institution,
                                 year,
                                 _id,
                              } = certification;

                              return (
                                 <View key={_id}>
                                    <Text style={fonts.description}>
                                       - {title}.{' '}
                                       {
                                          institution
                                       }{' '}
                                       ({year}).
                                    </Text>
                                 </View>
                              );
                           }
                        )}
                     </View>
                  </View>
               )}
            </View>
         </Page>
      </Document>
   );
};

Curriculum.propTypes = {
   devInfo: PropTypes.object,
};

export default Curriculum;
