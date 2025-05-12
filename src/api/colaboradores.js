import axios from "axios";
import { ENV } from "../utils";
import { storageCrtl } from "./storage";


async function verColaboradores() {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.COLABORADORES}`;
      const token = await storageCrtl.getToken();
  
      const paramsTemp = {      
        headers: {
          Authorization: token,          
          },
      };
  
      const response = await axios.get(url,paramsTemp);
  
      if (response.status !== 200) throw response;
  
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async function crearColaborador(rut, nombres, apaterno, amaterno, direccion, telefono, correo, ciudad, sexo, nacionalidad, cargo) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.COLABORADORES}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.post(url, {
          rut, 
          nombres, 
          apaterno, 
          amaterno, 
          direccion, 
          telefono, 
          correo, 
          ciudad, 
          sexo, 
          nacionalidad, 
          cargo
        },{
          headers: {
            Authorization: token, 
           "Content-Type": "application/x-www-form-urlencoded",
          }
        })

        return res.data

      } catch (error) {
        console.error(error);
      }
    
  }

  async function verUnColaborador(idColaborador) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.COLABORADORES}&id=${idColaborador}`;
      const token = await storageCrtl.getToken();
  
      const paramsTemp = {      
        headers: {
          Authorization: token,          
          },
      };
  
      const response = await axios.get(url,paramsTemp);
  
      if (response.status !== 200) throw response;
  
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async function updateColaborador(id, rut, nombres, apaterno, amaterno, direccion, telefono, correo, ciudad, sexo, nacionalidad, cargo) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.COLABORADORES}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.put(url, {
          id,
          rut, 
          nombres, 
          apaterno, 
          amaterno, 
          direccion, 
          telefono, 
          correo, 
          ciudad, 
          sexo, 
          nacionalidad, 
          cargo
        },{
          headers: {
            Authorization: token, 
           "Content-Type": "application/x-www-form-urlencoded",
          }
        })

        return res.data

      } catch (error) {
        console.error(error);
      }
    
  }
  
  
  export const colaboradoresCtrl = {
    verColaboradores,
    crearColaborador,
    verUnColaborador,
    updateColaborador
  };
