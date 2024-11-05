export interface Candidate {
  id?: string
  firstName: string
  lastName: string
  statusId: string
  vacancyId: string
  createdAt?: Date
  updatedAt?: Date
}

export interface CandidateStatus {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}
