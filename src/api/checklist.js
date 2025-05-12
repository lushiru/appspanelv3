import axios from "axios";
import { ENV } from "../utils";
import { storageCrtl } from "./storage";


async function verChecks() {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.CHECKLIST}`;
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

  async function crearChecklist(nombre,tipo) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.CHECKLIST}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.post(url, {
          nombre,
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

  async function verUnCheck(id) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.CHECKLIST}&id=${id}`;
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

  async function updateCheck(id, nombre, tipo) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.CHECKLIST}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.put(url, {
          id, 
          nombre, 
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

  async function deleteCheck(id) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.CHECKLIST}&id=${id}`;
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
  
  
  export const checklistCtrl = {
    verChecks,
    crearChecklist,
    verUnCheck,
    updateCheck,
    deleteCheck,
  };
