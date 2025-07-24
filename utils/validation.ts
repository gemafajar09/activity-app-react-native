import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Email tidak valid').required('Wajib diisi'),
  password: Yup.string().min(6, 'Minimal 6 karakter').required('Wajib diisi'),
});

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string().required('Nama wajib diisi'),
  email: Yup.string().email('Email tidak valid').required('Email wajib diisi'),
  password: Yup.string().min(6, 'Minimal 6 karakter').required('Password wajib diisi'),
});
