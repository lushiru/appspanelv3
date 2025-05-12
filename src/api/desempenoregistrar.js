import axios from "axios";
import { ENV } from "../utils";
import { storageCrtl } from "./storage";

async function verTrabajadores() {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.DESEMEMPENOREGISTRAR}`;
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


  async function verEvaluacion(desempenoId) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.DESEMEMPENOREGISTRAR}&iddes=${desempenoId}`;
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

  async function guardarTareas(idpers, tareas) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.DESEMEMPENOREGISTRAR}`;
    const token = await storageCrtl.getToken();

    const bodyFormData = new FormData();
    bodyFormData.append("idpers",idpers);
    let i=0;
    tareas.forEach((item) => {
        bodyFormData.append('valor['+i+']', item.valor);
        bodyFormData.append('idtarea['+i+']', item.idtarea);
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

  async function getEvalucionindividuales(idpers,idnom) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.DESEMEMPENOREGISTRAR}&idpers=${idpers}&idnom=${idnom}`;
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

  async function getmostrarevaluacionfecha(idperso,fecha2,iddeso) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.DESEMEMPENOREGISTRAR}&idperso=${idperso}&fecha2=${fecha2}&iddeso=${iddeso}`;
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

  async function getreportegral(idnomo) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.DESEMEMPENOREGISTRAR}&idnomo=${idnomo}`;
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

  async function getCategorias(idnomoo) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.DESEMEMPENOREGISTRAR}&idnomoo=${idnomoo}`;
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

  async function getEvaluacionCategoria(idnomooo,iddesoo) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.DESEMEMPENOREGISTRAR}&idnomooo=${idnomooo}&iddesoo=${iddesoo}`;
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

  async function getverreportegral() {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.VERDESEMPENOVER}`;
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

  export const desempeniosregistrarCtrl = {
    verTrabajadores,
    verEvaluacion,
    guardarTareas,
    getEvalucionindividuales,
    getmostrarevaluacionfecha,
    getreportegral,
    getCategorias,
    getEvaluacionCategoria,
    getverreportegral
  };