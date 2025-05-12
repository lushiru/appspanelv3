import * as Yup from "yup";

export function initialValues() {
  return {
    iniciativa: "",
    descripcion: "",
    tipo: "",
  };
}

export function validationSchema() {
  return Yup.object({
    iniciativa: Yup.string().required(false),
    descripcion: Yup.string().required(false),
    tipo: Yup.string().required(false),
  });
}