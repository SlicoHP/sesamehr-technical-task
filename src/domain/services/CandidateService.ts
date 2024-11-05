import type { HttpClient } from '@/domain/ports/HttpClient'
import type { Candidate, CandidateStatus } from '@/domain/models/Candidate'

export class CandidateService {
  private vacancyId: string = ''

  constructor(private readonly httpClient: HttpClient) {}

  setVacancyId(vacancyId: string) {
    this.vacancyId = vacancyId
  }

  async getCandidates(): Promise<{ data: Candidate[] }> {
    return await this.httpClient.get<{ data: Candidate[] }>(
      `/vacancies/${this.vacancyId}/candidates`,
    )
  }

  async getCandidateStatuses(): Promise<{ data: CandidateStatus[] }> {
    return await this.httpClient.get<{ data: CandidateStatus[] }>(
      `/candidate-status/${this.vacancyId}`,
    )
  }

  async addCandidate(candidate: Candidate): Promise<{ data: Candidate }> {
    return await this.httpClient.post<{ data: Candidate }>(
      `/candidates`,
      candidate,
    )
  }

  async editCandidate(candidate: Candidate): Promise<void> {
    return await this.httpClient.put(`/candidates/${candidate.id}`, candidate)
  }
}
