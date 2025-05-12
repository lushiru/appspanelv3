import axios from "axios";
import { ENV } from "../utils";
import { storageCrtl } from "./storage";


async function verChecksaplicar(id) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.CKECKLISTAPLICAR}&id=${id}`;
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

  async function crearChecklistaplicar(idverificacion, fecha, observacion, cumple) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.CKECKLISTAPLICAR}`;
    const token = await storageCrtl.getToken();

    const bodyFormData = new FormData();
    bodyFormData.append("idverificacion",idverificacion);
    bodyFormData.append("fecha",fecha);
    bodyFormData.append("observacion",observacion);
    let i=0;
    cumple.forEach((item) => {
        bodyFormData.append('idsubitem['+i+']', item.idsubitem);
        bodyFormData.append('valor['+i+']', item.valor);
        i++;
    });

    try {
              
        const res = await axios.post(url,bodyFormData,{
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data'
          }
        })

        return res.data

      } catch (error) {
        console.error(error);
      }
    
  }

  async function verCheckfecha() {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.CKECKLISTAPLICAR}`;
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

  async function verUnCheckmostrar(id,idfechas,nombretext) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.CKECKLISTAPLICAR}&id=${id}&idfechas=${idfechas}&nombretext=${nombretext}`;
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

  export const checklistaplicarCtrl = {
    verChecksaplicar,
    crearChecklistaplicar,
    verCheckfecha,
    verUnCheckmostrar,
  };
