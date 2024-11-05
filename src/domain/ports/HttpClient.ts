import type { AxiosRequestConfig } from 'axios'

export interface HttpClient {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T>(
    url: string,
    data?: AxiosRequestConfig['data'],
    config?: AxiosRequestConfig,
  ): Promise<T>
  put<T>(
    url: string,
    data?: AxiosRequestConfig['data'],
    config?: AxiosRequestConfig,
  ): Promise<T>
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>
}
