import * as Yup from "yup";

export function initialValues() {
  return {
    usuario: "",
    password: "",
  };
}

export function validationSchame() {
  return Yup.object({
    usuario: Yup.string().required(true),
    password: Yup.string().required(true),
  });
}