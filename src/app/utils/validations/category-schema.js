import * as yup from 'yup';

const categoryCommonSchema = yup.object({
    name: yup.string().required("Zorunlu alan"),
  });

export const createCategorySchema = categoryCommonSchema.shape({
image: yup.mixed().required("Zorunlu alan").test('fileType', 'JPG, JPEG veya PNG uzantılı dosyalar yüklenebilir', value =>
    !value || !value.name || /\.(jpg|png|jpeg)$/i.test(value.name)
),
});

export const updateCategorySchema =  categoryCommonSchema;