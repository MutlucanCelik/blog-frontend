import * as yup from 'yup'

export const loginSchema = yup.object({
    login: yup.string().required("Zorunlu alan"),
    password: yup.string().required('Zorunlu alan')
    .min(6, 'Şifre en az 6 karakter olmalı')
    /* .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      'Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir'
    ) */
  });