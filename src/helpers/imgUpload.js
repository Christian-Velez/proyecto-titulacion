const { default: axios } = require('axios');

export const imgUpload = async (file) => {
   const cloudUrl =
      'https://api.cloudinary.com/v1_1/dstwynawj/upload';

   const formData = new FormData();
   formData.append('upload_preset', 'titulacion');
   formData.append('file', file);

   try {
      const resp = await axios.post(
         cloudUrl,
         formData
      );

      const { data } = resp;
      
      if( data ) {
         return data.secure_url;
      }
      else{
         return null;
      }
   } catch (err) {
      console.log(err);
      return null;
   }
};


