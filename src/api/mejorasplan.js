import axios from "axios";
import { ENV } from "../utils";
import { storageCrtl } from "./storage";


async function verMejorasPlanes(idmejora) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.MEJORASPLAN}&idmejora=${idmejora}`;
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

  async function crearMejoraPlan(id,plandeaccion,indicador,indiceactual,meta,verificador,recursos,responsable,fecha,fecha2) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.MEJORASPLAN}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.post(url, {
            id,
            plandeaccion,
            indicador,
            indiceactual,
            meta,
            verificador,
            recursos,
            responsable,
            fecha,
            fecha2
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

  async function crearMejoraPlanObservacion(id,obs) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.MEJORASPLAN}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.post(url, {
            id,
            obs
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

  async function verUnMejoraPlan(id) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.MEJORASPLAN}&id=${id}`;
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

  async function updateMejoraplan(id,plandeaccion,indicador,indiceactual,meta,verificador,recursos,responsable,fecha,fecha2) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.MEJORASPLAN}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.put(url, {
            id,
            plandeaccion,
            indicador,
            indiceactual,
            meta,
            verificador,
            recursos,
            responsable,
            fecha,
            fecha2
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

  async function updateMejoraplanEstado(idclave,valor) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.MEJORASPLAN}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.put(url, {
            idclave,
            valor
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

  export const mejorasplanCtrl = {
    verMejorasPlanes,
    crearMejoraPlan,
    crearMejoraPlanObservacion,
    verUnMejoraPlan,
    updateMejoraplan,
    updateMejoraplanEstado,
  };
