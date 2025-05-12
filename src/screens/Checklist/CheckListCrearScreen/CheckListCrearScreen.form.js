import * as Yup from "yup";

export function initialValues() {
  return {
    nombre: "",
    tipo: "",
  };
}

export function validationSchema() {
  return Yup.object({
    nombre: Yup.string().required(false),
    tipo: Yup.string().required(false),
  });
}