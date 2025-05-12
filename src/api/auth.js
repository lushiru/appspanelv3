import { ENV } from "../utils";
import axios from "axios";

async function login(usuario, password) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.LOGIN}`;

    const url2 = `${ENV.API_URL}${ENV.ENDPOINTS.CSRFTOKEN}`;


    try {
            
        const response = await axios.get(url2);
    
        if (response.status !== 200) throw response;
    
        const res = await axios.post(url, {
            usuario: usuario,
            password: password,
            csrf_token: response.data.csrf
        },{
          headers: {
           "Content-Type": "application/x-www-form-urlencoded",
          }
        })

        return res.data


      } catch (error) {
        console.error(error);
      }
    
}
  
  export const authCtrl = {
    login,
  };