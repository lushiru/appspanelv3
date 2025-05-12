import axios from "axios";
import { ENV } from "../utils";
import { storageCrtl } from "./storage";


async function verChecksitem(id) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.CKECKLISTITEM}&id=${id}`;
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

  async function crearChecklistitem(id,nombre) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.CKECKLISTITEM}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.post(url, {
          id,
          nombre
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

  async function verUnCheckitem(idi) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.CKECKLISTITEM}&idi=${idi}`;
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

  async function updateCheckitem(id, nombre) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.CKECKLISTITEM}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.put(url, {
          id, 
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

  async function deleteCheckitem(id) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.CKECKLISTITEM}&id=${id}`;
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
  
  
  export const checklistitemCtrl = {
    verChecksitem,
    crearChecklistitem,
    verUnCheckitem,
    updateCheckitem,
    deleteCheckitem,
  };
