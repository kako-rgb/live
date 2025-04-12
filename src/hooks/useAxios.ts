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
  
  
   
  function request({ method ,pathData ,path }: AxiosProps){
  
      if (pathData){
          config ={
              url: path,
              baseURL: HOST_API,
              method: method,
              data: pathData
          }
       } else {
          config ={
              url: path,
              baseURL: HOST_API,
              method: method    
          } 
       }
  
      const response: Promise<AxiosResponse> = axiosInst(config)
      return response
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
    
     
    function request({ method ,pathData ,path }: AxiosProps){
    
        if (pathData){
            config ={
                url: path,
                baseURL: HOST_API,
                method: method,
                data: pathData
            }
         } else {
            config ={
                url: path,
                baseURL: HOST_API,
                method: method    
            } 
         }
    
        const response: Promise<AxiosResponse> = axiosInst(config);
        return response
     }
      
    return request
}