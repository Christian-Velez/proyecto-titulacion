import {
   extendTheme,
   withDefaultColorScheme,
   withDefaultProps,
} from '@chakra-ui/react';

import '@fontsource/inter';


const inputFocusBorderColor = {
   field: {
      _focus: {
        borderColor: "brand.500",
        boxShadow: "brand.500"
      }
    }
}

const blueBrandColor  = {
   50:  '#EBF8FF',
   100: '#BEE3F8',
   200: '#90CDF4',
   300: '#63B3ED',
   400: '#4299E1',
   500: '#3182CE',
   600: '#2B6CB0',
   700: '#2C5282',
   800: '#2A4365',
   900: '#1A365D',
}

//const purpleBrandColor = {
//   50:  '#FAF5FF',
//   100: '#E9D8FD',
//   200: '#D6BCFA',
//   300: '#B794F4',
//   400: '#9F7AEA',
//   500: '#805AD5',
//   600: '#6B46C1',
//   700: '#553C9A',
//   800: '#44337A',
//   900: '#322659',
//}

//const pinkBrandColor = {
//   50:  '#FFF5F7',
//   100: '#FED7E2',
//   200: '#FBB6CE',
//   300: '#F687B3',
//   400: '#ED64A6',
//   500: '#D53F8C',
//   600: '#B83280',
//   700: '#97266D',
//   800: '#702459',
//   900: '#521B41',
//}

//const greenBrandColor = {
//   50:  '#F0FFF4',
//   100: '#C6F6D5',
//   200: '#9AE6B4',
//   300: '#68D391',
//   400: '#48BB78',
//   500: '#38A169',
//   600: '#2F855A',
//   700: '#276749',
//   800: '#22543D',
//   900: '#1C4532',
//}

//const grayBrandColor = {
//   50:  '#F7FAFC',
//   100: '#EDF2F7',
//   200: '#E2E8F0',
//   300: '#CBD5E0',
//   400: '#A0AEC0',
//   500: '#718096',
//   600: '#4A5568',
//   700: '#2D3748',
//   800: '#1A202C',
//   900: '#171923', 
//}

const theme = extendTheme(
   withDefaultColorScheme({
      colorScheme: 'brand',
      components: ['Button'],
   }),
   withDefaultProps({
      defaultProps: {
        variant: 'filled',
      },
      components: ['Input', 'NumberInput', 'PinInput', 'Select', 'Textarea'],
    }),
   {
      colors: {
         brand: blueBrandColor
      },
      fonts: {
         heading: 'Inter',
         body: 'Inter',
      },
      styles: {
         global: {
            body: {
               color: 'gray.700',
            },
         }
      },
      components: {
         Input: {
            variants: {
               filled: inputFocusBorderColor,
               outline: inputFocusBorderColor
            },
         },
         Select: {
            variants: {
               filled: inputFocusBorderColor,
               outline: inputFocusBorderColor
            },
         },
         Textarea: {
            variants: {
               filled: inputFocusBorderColor.field,
               outline: inputFocusBorderColor.field,
            },
         }
      }
   },

   
);

export default theme;
