import * as Yup from "yup";

export const LoginSchema = Yup.object({
  password: Yup.string().required(),
  email: Yup.string().email().required(),
});
