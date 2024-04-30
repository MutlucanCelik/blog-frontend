import * as yup from 'yup';


export const settingSchema = yup.object({
    footer_text: yup.string().required("Zorunlu alan"),
    description: yup.string().required("Zorunlu alan"),
    logo: yup.mixed().required("Zorunlu alan").test('fileType', 'JPG, JPEG veya PNG uzantılı dosyalar yüklenebilir', value =>
      !value || !value.name || /\.(jpg|png|jpeg)$/i.test(value.name)
    ),
    home_slider_text: yup.string().required("Zorunlu alan"),
    home_slider_image: yup
    .mixed()
    .required("Zorunlu alan")
    .test('fileType', 'JPG,JPEG veya PNG uzantılır dosyalar yüklenebilir', value =>
      !value || !value.name || /\.(jpg|png|jpeg)$/i.test(value.name)
    ),
  });
