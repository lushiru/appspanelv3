import axios from "axios";
import { ENV } from "../utils";
import { storageCrtl } from "./storage";


async function verMejoras() {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.MEJORAS}`;
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

  async function crearMejora(iniciativa,descripcion,tipo) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.MEJORAS}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.post(url, {
          iniciativa,
          descripcion,
          tipo
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

  async function verUnMejora(id) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.MEJORAS}&id=${id}`;
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

  async function updateMejora(id, iniciativa, descripcion, tipo) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.MEJORAS}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.put(url, {
          id, 
          iniciativa, 
          descripcion, 
          tipo
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

  async function deleteMejora(id) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.MEJORAS}&id=${id}`;
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
  
  
  export const mejorasCtrl = {
    verMejoras,
    crearMejora,
    verUnMejora,
    updateMejora,
    deleteMejora,
  };
