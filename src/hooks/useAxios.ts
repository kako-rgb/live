import { HOST_API } from '@/config';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { signOut } from 'next-auth/react';

export const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

type AxiosProps = {
    method: string,
    path: string,
    pathData?: any
}

export function axiosHandler(token?: string) {

  let config: AxiosRequestConfig ;
  
  let headers: RawAxiosRequestHeaders;
  
    if (token) {
      headers = {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      };
    } else {
      headers = {
        "Content-Type": "application/json",
      };
    }
   
  const axiosInst: AxiosInstance = axios.create({
      headers: headers,
      timeout: 200000,
  });
  
  
   
  function request({ method, pathData, path }: AxiosProps) {
      if (!HOST_API) {
          throw new Error('HOST_API is not defined. Please check your configuration.');
      }

      // Ensure path starts with forward slash
      const normalizedPath = path.startsWith('/') ? path : `/${path}`;
      
      if (pathData) {
          config = {
              url: normalizedPath,
              baseURL: HOST_API,
              method: method,
              data: pathData
          }
      } else {
          config = {
              url: normalizedPath,
              baseURL: HOST_API,
              method: method    
          } 
      }

      // Ensure baseURL is properly formatted
      const baseURL = typeof HOST_API === 'string' && HOST_API.trim();
      if (baseURL && !baseURL.startsWith('http://') && !baseURL.startsWith('https://')) {
          config.baseURL = `https://${baseURL}`;
      }

      const response: Promise<AxiosResponse> = axiosInst(config);
      return response;
  }
    
    return request
}

export default function useAxios(token?: string) {

    let config: AxiosRequestConfig ;
    
    let headers: RawAxiosRequestHeaders;
    
      if (token) {
        headers = {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        };
      } else {
        headers = {
          "Content-Type": "application/json",
        };
      }
     
    const axiosInst: AxiosInstance = axios.create({
        headers: headers,
        timeout: 200000,
    });
    

    axiosInst.interceptors.response.use(async function (response) {
      if (response.status === 401) {
        console.log('Error');
        await signOut();
      }
      return response;
    });
    
     
    function request({ method, pathData, path }: AxiosProps) {
        if (!HOST_API) {
            throw new Error('HOST_API is not defined. Please check your configuration.');
        }

        // Ensure path starts with forward slash
        const normalizedPath = path.startsWith('/') ? path : `/${path}`;
        
        if (pathData) {
            config = {
                url: normalizedPath,
                baseURL: HOST_API,
                method: method,
                data: pathData
            }
        } else {
            config = {
                url: normalizedPath,
                baseURL: HOST_API,
                method: method    
            } 
        }

        // Ensure baseURL is properly formatted
        const baseURL = typeof HOST_API === 'string' && HOST_API.trim();
        if (baseURL && !baseURL.startsWith('http://') && !baseURL.startsWith('https://')) {
            config.baseURL = `https://${baseURL}`;
        }

        const response: Promise<AxiosResponse> = axiosInst(config);
        return response;
    }
      
    return request
}