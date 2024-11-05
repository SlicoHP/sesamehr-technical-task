import { HttpClientFactory } from '@/infrastructure/factories/HttpClientFactory'
import { CandidateService } from '@/domain/services/CandidateService'

export function useCandidateService() {
  const httpClient = HttpClientFactory.create(
    import.meta.env.VITE_API_URL ||
      'https://api-test.sesametime.com/recruitment/v1',
  )

  return new CandidateService(httpClient)
}
