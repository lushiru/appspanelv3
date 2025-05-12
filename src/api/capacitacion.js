import axios from "axios";
import { ENV } from "../utils";
import { storageCrtl } from "./storage";


async function verCapacitaciones() {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.CAPACITACION}`;
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

  async function crearCapacitacion(instruccion,tipo,dirigidoa,objetivo,metodologia) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.CAPACITACION}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.post(url, {
          instruccion,
          tipo,
          dirigidoa,
          objetivo,
          metodologia
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

  async function verUnCapacitacion(id) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.CAPACITACION}&id=${id}`;
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

  async function updateCapacitacion(id,instruccion,tipo,dirigidoa,objetivo,metodologia) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.CAPACITACION}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.put(url, {
          id,
          instruccion,
          tipo,
          dirigidoa,
          objetivo,
          metodologia          
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

  async function deleteCapacitacion(id) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.CAPACITACION}&id=${id}`;
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

  async function leerimp(id) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.CAPACITACIONIMP}&id=${id}`;
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
  
  
  export const capacitacionCtrl = {
    verCapacitaciones,
    crearCapacitacion,
    verUnCapacitacion,
    updateCapacitacion,
    deleteCapacitacion,
    leerimp,
  };
