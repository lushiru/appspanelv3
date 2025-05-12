import * as Yup from "yup";

export function initialValues() {
  return {
    tarea: "",
  };
}

export function validationSchema() {
  return Yup.object({
    tarea: Yup.string().required(true),
  });
}