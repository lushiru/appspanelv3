import * as Yup from "yup";

export function initialValues() {
  return {
    plandeaccion: "",
    indicador: "",
    indiceactual: "",
    meta: "",
    verificador: "",
    recursos: "",
    responsable: "",
    fecha: "",
    fecha2: "",
  };
}

export function validationSchema() {
  return Yup.object({
    plandeaccion: Yup.string().required(false),
    indicador: Yup.string().required(false),
    indiceactual: Yup.string().required(false),
    meta: Yup.string().required(false),
    verificador: Yup.string().required(false),
    recursos: Yup.string().required(false),
    responsable: Yup.string().required(false),
    fecha: Yup.date().required(false),
    fecha2: Yup.date().required(false),
  });
}