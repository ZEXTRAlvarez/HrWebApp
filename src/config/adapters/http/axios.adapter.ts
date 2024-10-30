import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from './http.adapter';
import { Company } from '../../../core/entities/company.entity';
import { UserLogin } from '../../../core/use-cases/users/login-user.use-case';

interface Options {
  baseUrl: string;
  params: Record<string,string>;
}

export class AxiosAdapter implements HttpAdapter {
  
  private axiosInstance: AxiosInstance;

  constructor( options: Options ) {
    this.axiosInstance = axios.create({
      baseURL: options.baseUrl,
      params: options.params,
    })
  }
  async get<T>( url: string, options?: Record<string, unknown> | undefined ): Promise<T> {
    
    try {
      
      const { data } = await this.axiosInstance.get<T>(url, options );

      return data;

    } catch (error) {
      throw new Error(`Error fetching get: ${ url } error: ${error}`);
    }
  }
  async delete<T>( url: string, options?: Record<string, unknown> | undefined ): Promise<T> {      
      try {        
        const { data } = await this.axiosInstance.delete<T>(url, options );
  
        return data;  
      } catch (error) {
        throw new Error(`Error fetching delete: ${ url } error: ${error}`);
    }
  }
  async post<T>( url: string, data: Company, options?: Record<string, unknown> | undefined ): Promise<T> {
    try {
      const { data: responseData } = await this.axiosInstance.post<T>(url, data, options );
      return responseData;
    } catch (error) {
      throw new Error(`Error fetching post: ${ url } error: ${error}`);
    }
  }
  async postLogin<T>( url: string, data: UserLogin, options?: Record<string, unknown> | undefined ): Promise<T> {
    try {
      const { data: responseData } = await this.axiosInstance.post<T>(url, data, options );
      return responseData;
    } catch (error) {
      throw new Error(`Error fetching post: ${ url } error: ${error}`);
    }
  }
}


