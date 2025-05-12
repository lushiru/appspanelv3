import * as Yup from "yup";

export function initialValues() {
  return {
    rut: "",
    nombres: "",
    apaterno: "",
    amaterno: "",
    direccion: "",
    telefono: "",
    correo: "",
    ciudad: "",
    sexo: "",
    nacionalidad: "",
    cargo: "",
  };
}

export function validationSchema() {
  return Yup.object({
    rut: Yup.string().required(false),
    nombres: Yup.string().required(false),
    apaterno: Yup.string().required(false),
    amaterno: Yup.string().required(false),
    direccion: Yup.string().required(false),
    telefono: Yup.string().required(false),
    correo: Yup.string().required(false),
    ciudad: Yup.string().required(false),
    sexo: Yup.string().required(false),
    nacionalidad: Yup.string().required(false),
    cargo: Yup.string().required(false),
  });
}