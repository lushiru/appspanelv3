import axios from "axios";
import { ENV } from "../utils";
import { storageCrtl } from "./storage";



  async function crearPorcentajeoptimo(idnom,porcentaje) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.DESEMPENOPORCENTAJEOPTIMO}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.post(url, {
            idnom,
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

  async function verUnPorcentajeoptimo(iddes) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.DESEMPENOPORCENTAJEOPTIMO}&iddes=${iddes}`;
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

  

  export const desempeniosporcentajeCtrl = {
    crearPorcentajeoptimo,
    verUnPorcentajeoptimo,
  };