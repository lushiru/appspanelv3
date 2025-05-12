import * as Yup from "yup";

export function initialValues() {
  return {
    nombre: "",
    porcentaje: "",
  };
}

export function validationSchema() {
  return Yup.object({
    nombre: Yup.string().required(true),
    porcentaje: Yup.number().required(true),
  });
}