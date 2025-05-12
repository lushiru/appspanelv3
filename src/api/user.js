import { ENV } from "../utils/constants";
import { storageCrtl } from "./storage";
import axios from "axios";

async function getMe(token) {

  await storageCrtl.setToken(token);
  try {
    const url = `${ENV.API_URL}${ENV.ENDPOINTS.USERS_ME}`;
         
    const paramsTemp = {      
      headers: {
        Authorization: token,        
        },
    };
    if(token == null || token == undefined){
      return null
    }
    const response = await axios.get(url, paramsTemp);

    if (response.status !== 200) throw response;

    return response.data;

  } catch (error) {
    console.error("es"+error); 
  }

}

export const userCtrl = {
  getMe,
};