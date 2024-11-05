<script lang="ts" setup>
import { computed, ref, type Ref } from 'vue'
import type { Candidate, CandidateStatus } from '@/domain/models/Candidate'
import IconClose from '@/components/icons/IconClose.vue'

const props = defineProps<{
  candidateStatuses: CandidateStatus[]
  mode: 'add' | 'edit'
  editCandidate: Candidate | null
}>()

const emits = defineEmits<{
  addCandidate: [candidate: Candidate]
  editCandidate: [candidate: Candidate]
  close: []
}>()

const handleSubmit = () => {
  if (props.mode === 'add') {
    emits('addCandidate', candidate.value)
  } else {
    emits('editCandidate', candidate.value)
  }
}

const candidate: Ref<Candidate> = ref({
  id: props.editCandidate?.id || '',
  firstName: props.editCandidate?.firstName || '',
  lastName: props.editCandidate?.lastName || '',
  statusId: props.editCandidate?.statusId || '',
  vacancyId: props.editCandidate?.vacancyId || '',
})

const isFormValid = computed(() => {
  return (
    candidate.value.firstName &&
    candidate.value.lastName &&
    candidate.value.statusId
  )
})
</script>

<template>
  <div
    class="fixed z-50 top-0 left-0 w-full h-full bg-slate-500 bg-opacity-50 flex items-center justify-center"
  >
    <div
      class="bg-white rounded-xl w-full max-w-screen-sm p-4 shadow-sesame-xl relative"
    >
      <div class="flex justify-end absolute top-0 right-0 p-3">
        <icon-close
          data-testid="close-icon"
          class="cursor-pointer"
          @click="emits('close')"
        />
      </div>
      <span
        data-testid="form-title"
        class="text-xl font-bold text-dark-blue mb-4 pb-2 block border-b border-slate-100"
      >
        {{ mode === 'add' ? 'Añadir candidato' : 'Editar candidato' }}
      </span>
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label class="text-sm text-dark-blue pl-2" for="firstname"
            >Nombre</label
          >
          <input
            v-model="candidate.firstName"
            id="firstname"
            type="text"
            class="bg-slate-50 gap-2 ring-1 ring-inset ring-slate-200 text-slate-400 text-sm rounded-xl py-2 px-4 w-full"
            placeholder="Nombre"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm text-dark-blue pl-2" for="surname"
            >Apellido</label
          >
          <input
            v-model="candidate.lastName"
            id="surname"
            type="text"
            class="bg-slate-50 gap-2 ring-1 ring-inset ring-slate-200 text-slate-400 text-sm rounded-xl py-2 px-4 w-full"
            placeholder="Apellido"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm text-dark-blue pl-2" for="status">Estado</label>
          <select
            v-model="candidate.statusId"
            id="status"
            class="bg-slate-50 gap-2 text-slate-400 text-sm rounded-xl py-2 px-4 w-full border-r-8 border-transparent ring-1 ring-slate-200"
          >
            <option value="">Selecciona un estado</option>
            <option
              v-for="status in candidateStatuses"
              :value="status.id"
              :key="status.id"
            >
              {{ status.name }}
            </option>
          </select>
        </div>
        <button
          data-testid="submit-button"
          :disabled="!isFormValid"
          class="bg-dark-blue disabled:bg-slate-400 disabled:cursor-not-allowed text-white rounded-xl px-3 py-[7px] text-sm w-full max-w-[134px] ml-auto"
        >
          Guardar
        </button>
      </form>
    </div>
  </div>
</template>
