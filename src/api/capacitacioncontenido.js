import axios from "axios";
import { ENV } from "../utils";
import { storageCrtl } from "./storage";


async function verCapacitacionescontenido(id) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.CAPACITACIONCONTENIDO}&id=${id}`;
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

  async function crearCapacitacioncontenido(id,contenido,estrategia,tiempo) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.CAPACITACIONCONTENIDO}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.post(url, {
          id,
          contenido,
          estrategia,
          tiempo
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

  async function verUnCapacitacioncontenido(idc) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.CAPACITACIONCONTENIDO}&idc=${idc}`;
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

  async function updateCapacitacioncontenido(id,idcon,contenido,estrategia,tiempo) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.CAPACITACIONCONTENIDO}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.put(url, {
          id,
          idcon,
          contenido,
          estrategia,
          tiempo          
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

  async function deleteCapacitacioncontenido(idi,idc) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.CAPACITACIONCONTENIDO}&idi=${idi}&idc=${idc}`;
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
  
  export const capacitacioncontenidoCtrl = {
    verCapacitacionescontenido,
    crearCapacitacioncontenido,
    verUnCapacitacioncontenido,
    updateCapacitacioncontenido,
    deleteCapacitacioncontenido,
  };
