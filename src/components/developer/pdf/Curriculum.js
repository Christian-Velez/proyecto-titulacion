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

Font.register({
   family: 'Oswald',
   src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const fonts = StyleSheet.create({
   name: {
      fontSize: 19,
      textAlign: 'justify',
      fontFamily: 'Times-Roman',
   },

   description: {
      fontSize: 10,
      fontFamily: 'Oswald',
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
      backgroundColor: '#2C5282',
      color: 'white',
      padding: '10px',
   },
   right: {
      width: '70%',
      padding: '20px',
      backgroundColor: '#F7FAFC',
   },


   technologyItem: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 5
   }
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

               <Text style={fonts.name}>
                  {devInfo.name}
               </Text>

               <Text style={fonts.description}>{devInfo.location}</Text>

               <Text>Acerca de mi </Text>
               <Text style={fonts.description}>
                  {devInfo.description}
               </Text>
            </View>

            <View style={styles.right}>
               <Text>Tecnologias</Text>
               {devInfo.technologies.map(
                  (item) => {
                     const { technology, _id } =
                        item;
                     let { img, name } =
                        technology;

                     if(typeof img === 'string' && img.includes('svg')) {
                        img = img.replace(/svg/g, 'png');
                     }

                     return (
                        <View key={_id} style={styles.technologyItem}>
                           {
                              img && <Image src={img} style={{ width: '20px' }}/>
                           }
                           <Text>{name}</Text>
                        </View>
                     );
                  }
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
