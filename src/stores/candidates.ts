import { defineStore } from 'pinia'
import type { Candidate, CandidateStatus } from '@/domain/models/Candidate'
import { ref, computed } from 'vue'
import { CandidateService } from '@/domain/services/CandidateService'

export const useCandidatesStore = defineStore('candidates', () => {
  const state = ref<{
    candidates: Candidate[]
    candidatesByStatus: Record<string, Candidate[]>
    candidateStatuses: CandidateStatus[]
    isEditCandidateModalOpen: boolean
    candidateToEdit: Candidate | null
    draggedCandidate: Candidate | null
  }>({
    candidates: [],
    candidatesByStatus: {},
    candidateStatuses: [],
    isEditCandidateModalOpen: false,
    candidateToEdit: null,
    draggedCandidate: null,
  })

  async function fetchCandidatesData(
    candidateService: CandidateService,
    vacancyId: string,
  ) {
    candidateService.setVacancyId(vacancyId as string)

    try {
      const [candidatesData, candidateStatusData] = await Promise.all([
        candidateService.getCandidates(),
        candidateService.getCandidateStatuses(),
      ])
      state.value.candidateStatuses = candidateStatusData.data
      state.value.candidates = candidatesData.data
      state.value.candidatesByStatus = candidatesData.data.reduce(
        (acc, candidate) => {
          if (!acc[candidate.statusId]) {
            acc[candidate.statusId] = []
          }
          acc[candidate.statusId].push(candidate)
          return acc
        },
        {} as Record<string, Candidate[]>,
      )
    } catch (error) {
      console.error(error)
    }
  }

  async function addCandidate(
    candidateService: CandidateService,
    candidate: Candidate,
    vacancyId: string,
  ) {
    await candidateService.addCandidate({
      ...candidate,
      vacancyId: vacancyId as string,
    })
    state.value.candidates.push(candidate)
  }

  async function editCandidate(
    candidateService: CandidateService,
    candidate: Candidate,
  ) {
    await candidateService.editCandidate(candidate)
    state.value.candidates = state.value.candidates.map(c =>
      c.id === candidate.id ? candidate : c,
    )
    state.value.candidateToEdit = null
  }

  async function setCandidateStatus(
    candidateService: CandidateService,
    candidate: Candidate,
    statusId: string,
  ) {
    await candidateService.editCandidate({ ...candidate, statusId })
    state.value.candidates = state.value.candidates.map(c =>
      c.id === candidate.id ? { ...c, statusId } : c,
    )
  }

  const candidates = computed(() => state.value.candidates)
  const candidateStatuses = computed(() => state.value.candidateStatuses)
  const draggedCandidate = computed(() => state.value.draggedCandidate)
  const isEditCandidateModalOpen = computed(
    () => state.value.isEditCandidateModalOpen,
  )
  const candidateToEdit = computed(() => state.value.candidateToEdit)

  const candidatesByStatus = computed(() => {
    return state.value.candidates.reduce(
      (acc, candidate) => {
        if (!acc[candidate.statusId]) {
          acc[candidate.statusId] = []
        }
        acc[candidate.statusId].push(candidate)
        return acc
      },
      {} as Record<string, Candidate[]>,
    )
  })

  function setDraggedCandidate(candidate: Candidate | null) {
    state.value.draggedCandidate = candidate
  }

  function setEditCandidate(candidate: Candidate | null) {
    state.value.candidateToEdit = candidate
  }

  function toggleEditCandidateModal(isOpen: boolean) {
    state.value.isEditCandidateModalOpen = isOpen
  }

  return {
    state,
    candidates,
    candidateStatuses,
    candidatesByStatus,
    draggedCandidate,
    isEditCandidateModalOpen,
    candidateToEdit,
    addCandidate,
    fetchCandidatesData,
    editCandidate,
    toggleEditCandidateModal,
    setEditCandidate,
    setCandidateStatus,
    setDraggedCandidate,
  }
})
