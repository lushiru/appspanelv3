import axios from "axios";
import { ENV } from "../utils";
import { storageCrtl } from "./storage";

async function verDesempeniosConducta(idsub) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.DESEMPENOCONDUCTA}&idsub=${idsub}`;
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

  async function crearDesempenoConducta(idsub,tarea) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.DESEMPENOCONDUCTA}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.post(url, {
            idsub,
            tarea,
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

  async function verUnDesempenioConducta(desempenoId) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.DESEMPENOCONDUCTA}&id=${desempenoId}`;
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

  async function updateDesempenioConducta(id, tarea) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.DESEMPENOCONDUCTA}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.put(url, {
          id,
          tarea,
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

  async function deleteDesempenioConducta(id) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.DESEMPENOCONDUCTA}&id=${id}`;
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

  export const desempenoconductaCtrl = {
    verDesempeniosConducta,
    crearDesempenoConducta,
    verUnDesempenioConducta,
    updateDesempenioConducta,
    deleteDesempenioConducta,
  };