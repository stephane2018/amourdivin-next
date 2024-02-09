import * as yup from "yup";

export const ContactFormSchema = yup.object({
  name: yup.string().required("entrer un nom valide"),
  email: yup
    .string()
    .email("entrer un email valide ")
    .required("entrer un email"),
  message: yup.string().required("entrer un message"),
});
export type ContactType = yup.InferType<typeof ContactFormSchema>;
