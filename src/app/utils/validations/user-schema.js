import * as yup from 'yup';

export const userSchema = yup.object({
    first_name: yup.string().required("Zorunlu alan"),
    last_name: yup.string().required("Zorunlu alan"),
    image: yup.mixed().test('fileType', 'JPG, JPEG veya PNG uzantılı dosyalar yüklenebilir', value =>
        !value || !value.name || /\.(jpg|png|jpeg)$/i.test(value.name)
    ),
    email: yup.string().required("Zorunlu alan").email('Email formatında bir değer girin'),
  });
