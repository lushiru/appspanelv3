import { useState, useEffect, createContext } from "react";
import { storageCrtl, userCtrl } from "../api";

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    retrieveSession();
  }, []);

  const retrieveSession = async () => {
    
    const token = await storageCrtl.getToken();

    if (!token) {
      logout();
      setLoading(false);
      return;
    } else {
      await login(token);
    }
  };

  const login = async (token) => {
    try {
      const response = await userCtrl.getMe(token);
      if(response.resultado=="tokenexpiro" || response.resultado=="noencontradonovertokenvalido"){
        setUser(null);  
      }else{setUser(response);}
      setLoading(false);
    } catch (error) {
      console.error(error);
      setUser(null);
      setLoading(false);
    }
  };

  const logout = async () => {
    await storageCrtl.removeToken();
    setUser(null);
  };

  
  const data = {
    user,
    login,
    logout,
  };

  if (loading) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}