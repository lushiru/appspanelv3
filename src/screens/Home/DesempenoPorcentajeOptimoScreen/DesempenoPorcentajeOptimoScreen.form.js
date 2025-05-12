import * as Yup from "yup";

export function initialValues() {
  return {
    porcentaje: "",
  };
}

export function validationSchema() {
  return Yup.object({
    porcentaje: Yup.number().required(true),
  });
}