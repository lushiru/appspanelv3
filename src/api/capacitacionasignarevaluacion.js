import axios from "axios";
import { ENV } from "../utils";
import { storageCrtl } from "./storage";


async function verCapacitacionesLista(idplan) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.CAPACITACIONASIGNAREVALUACION}&idplan=${idplan}`;
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

  

  async function updateCapacitacionLista(idcontenidos,id_verificacion) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.CAPACITACIONASIGNAREVALUACION}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.put(url, {
          idcontenidos,
          id_verificacion          
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

  
  
  export const capacitacionasignarevaluacionCtrl = {
    verCapacitacionesLista,
    updateCapacitacionLista,
  };
