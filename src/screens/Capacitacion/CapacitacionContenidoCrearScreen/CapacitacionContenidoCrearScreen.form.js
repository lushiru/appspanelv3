import * as Yup from "yup";

export function initialValues() {
  return {
    contenido: "",
    estrategia: "",
    tiempo: "",
  };
}

export function validationSchema() {
  return Yup.object({
    contenido: Yup.string().required(false),
    estrategia: Yup.string().required(false),
    tiempo: Yup.string().required(true),
  });
}