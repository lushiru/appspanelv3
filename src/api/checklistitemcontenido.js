import axios from "axios";
import { ENV } from "../utils";
import { storageCrtl } from "./storage";


async function verChecksitemcontenido(iditem) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.CKECKLISTITEMCONTENIDO}&iditem=${iditem}`;
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

  async function crearChecklistitemcontenido(item,nombresubitem) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.CKECKLISTITEMCONTENIDO}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.post(url, {
          item,
          nombresubitem
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

  async function verUnCheckitemcontenido(item) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.CKECKLISTITEMCONTENIDO}&item=${item}`;
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

  async function updateCheckitemcontenido(item, nombre) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.CKECKLISTITEMCONTENIDO}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.put(url, {
          item, 
          nombre, 
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

  async function deleteCheckitemcontenido(item) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.CKECKLISTITEMCONTENIDO}&item=${item}`;
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
  
  
  export const checklistitemcontenidoCtrl = {
    verChecksitemcontenido,
    crearChecklistitemcontenido,
    verUnCheckitemcontenido,
    updateCheckitemcontenido,
    deleteCheckitemcontenido,
  };
