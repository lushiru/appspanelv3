import axios from "axios";
import { ENV } from "../utils";
import { storageCrtl } from "./storage";

async function verDesempeniosEvaluacion(iddes) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.DESEMPENOEVALUACION}&iddes=${iddes}`;
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

  async function crearDesempenoEvaluacion(iddes,nombre,porcentaje) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.DESEMPENOEVALUACION}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.post(url, {
            iddes,
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

  async function verUnDesempenioEvaluacion(desempenoId) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.DESEMPENOEVALUACION}&id=${desempenoId}`;
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

  async function updateDesempenioEvaluacion(id, nombre, porcentaje) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.DESEMPENOEVALUACION}`;
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

  async function deleteDesempenioEvaluacion(id) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.DESEMPENOEVALUACION}&id=${id}`;
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

  export const desempeniosevaluacionCtrl = {
    verDesempeniosEvaluacion,
    crearDesempenoEvaluacion,
    verUnDesempenioEvaluacion,
    updateDesempenioEvaluacion,
    deleteDesempenioEvaluacion,
  };