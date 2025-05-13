import * as Yup from "yup";

export function initialValues() {
  return {
    fecha: "",
    idtrabajador: "",
  };
}

export function validationSchema() {
  return Yup.object({
    fecha: Yup.date().required(true),
    idtrabajador: Yup.string().required(true),
  });
}