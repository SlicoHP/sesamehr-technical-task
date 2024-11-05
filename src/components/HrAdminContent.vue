<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import HrTabsMenu from '@/components/HrTabsMenu.vue'
import HrAdminContentHeader from '@/components/HrAdminContentHeader.vue'
import HrStatusTable from '@/components/HrStatusTable.vue'
import HrAdminAddCandidateModal from '@/components/HrAdminAddCandidateModal.vue'
import { useCandidatesStore } from '@/stores/candidates'
import type { Candidate } from '@/domain/models/Candidate'
import { useCandidateService } from '@/infrastructure/adapters/composables/useCandidateService'

const {
  params: { id: vacancyId },
} = useRoute()
const candidatesStore = useCandidatesStore()
const activeTab: Ref<string> = ref('vacantes')
const candidateService = useCandidateService()

candidatesStore.fetchCandidatesData(candidateService, vacancyId as string)

const setActiveTab = (tab: string) => {
  activeTab.value = tab
}

const isActiveTab = (tab: string): boolean => {
  return activeTab.value === tab
}

const openAddCandidateModal = () => {
  candidatesStore.toggleEditCandidateModal(true)
}

const addCandidate = async (candidate: Candidate) => {
  await candidatesStore.addCandidate(
    candidateService,
    candidate,
    vacancyId as string,
  )
  candidatesStore.toggleEditCandidateModal(false)
}

const editCandidate = async (candidate: Candidate) => {
  await candidatesStore.editCandidate(candidateService, candidate)
  candidatesStore.toggleEditCandidateModal(false)
}

const closeCandidateModal = () => {
  candidatesStore.setEditCandidate(null)
  candidatesStore.toggleEditCandidateModal(false)
}

const onDrop = async (statusId: string) => {
  if (candidatesStore.draggedCandidate) {
    await candidatesStore.setCandidateStatus(
      candidateService,
      candidatesStore.draggedCandidate,
      statusId,
    )
  }
}
</script>

<template>
  <div class="w-full max-w-screen-lg flex flex-col pb-6">
    <h1 class="text-3xl font-bold my-6 text-dark-blue">Reclutamiento</h1>
    <div class="bg-white rounded-xl flex-1 px-4 pb-4 shadow-sesame-xl">
      <div class="h-full gap-4 flex flex-col">
        <hr-tabs-menu
          :active-tab="activeTab"
          @update:active-tab="setActiveTab"
        />
        <hr-admin-content-header @add-candidate="openAddCandidateModal" />
        <hr-admin-add-candidate-modal
          v-if="candidatesStore.isEditCandidateModalOpen"
          :candidate-statuses="candidatesStore.candidateStatuses"
          :mode="candidatesStore.candidateToEdit ? 'edit' : 'add'"
          :edit-candidate="candidatesStore.candidateToEdit || null"
          @add-candidate="addCandidate"
          @edit-candidate="editCandidate"
          @close="closeCandidateModal"
        />
        <hr-status-table
          v-show="isActiveTab('vacantes')"
          :candidates="candidatesStore.candidates"
          :candidate-statuses="candidatesStore.candidateStatuses"
          @on-drop="onDrop"
        />
        <div v-show="isActiveTab('candidatos')">CANDIDATOS TAB</div>
      </div>
    </div>
  </div>
</template>
