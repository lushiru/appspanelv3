import * as Yup from "yup";

export function initialValues() {
  return {
    instruccion: "",
    tipo: "",
    dirigidoa: "",
    objetivo: "",
    metodologia: "",
  };
}

export function validationSchema() {
  return Yup.object({
    instruccion: Yup.string().required(false),
    tipo: Yup.string().required(false),
    dirigidoa: Yup.string().required(false),
    objetivo: Yup.string().required(false),
    metodologia: Yup.string().required(false),
  });
}