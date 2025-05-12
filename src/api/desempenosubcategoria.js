import axios from "axios";
import { ENV } from "../utils";
import { storageCrtl } from "./storage";

async function verDesempeniosSub(idcat) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.DESEMPENOEVALUACIONSUB}&idcat=${idcat}`;
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

  async function crearDesempenoSub(idcat,nombre,porcentaje) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.DESEMPENOEVALUACIONSUB}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.post(url, {
            idcat,
            nombre,
            porcentaje
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

  async function verUnDesempenioSub(desempenoId) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.DESEMPENOEVALUACIONSUB}&id=${desempenoId}`;
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

  async function updateDesempenioSub(id, nombre, porcentaje) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.DESEMPENOEVALUACIONSUB}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.put(url, {
          id,
          nombre,
          porcentaje,
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

  async function deleteDesempenioSub(id) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.DESEMPENOEVALUACIONSUB}&id=${id}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.delete(url,{
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

  export const desempenosubcategoriaCtrl = {
    verDesempeniosSub,
    crearDesempenoSub,
    verUnDesempenioSub,
    updateDesempenioSub,
    deleteDesempenioSub,
  };