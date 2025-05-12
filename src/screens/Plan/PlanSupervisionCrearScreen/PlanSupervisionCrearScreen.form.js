import * as Yup from "yup";

export function initialValues() {
  return {
    actividadasup: "",
    supervisar: "",
    tarea: "",
    frecuencia: "",
    inicio: "",
    checklist: "",
    indicador: "",
    tipodereporte: "",
    observacion: "",
  };
}

export function validationSchema() {
  return Yup.object({
    actividadasup: Yup.string().required(false),
    supervisar: Yup.string().required(false),
    tarea: Yup.string().required(false),
    frecuencia: Yup.string().required(false),
    inicio: Yup.date().required(false),
    checklist: Yup.string().required(false),
    indicador: Yup.string().required(false),
    tipodereporte: Yup.string().required(false),
    observacion: Yup.string().required(false),
  });
}