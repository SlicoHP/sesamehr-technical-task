import { AxiosHttpClient } from '@/infrastructure/adapters/http/AxiosHttpClient'
import type { HttpClient } from '@/domain/ports/HttpClient'

export class HttpClientFactory {
  static create(baseURL: string): HttpClient {
    return new AxiosHttpClient(baseURL)
  }
}
