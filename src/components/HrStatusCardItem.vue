<script lang="ts" setup>
import { computed, type ComputedRef } from 'vue'
import { useTimeAgo } from '@vueuse/core'
import IconDotsVertical from '@/components/icons/IconDotsVertical.vue'
import IconClock from '@/components/icons/IconClock.vue'
import type { Candidate } from '@/domain/models/Candidate'
import { ref, type Ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import HrStatusCardItemActions from '@/components/HrStatusCardItemActions.vue'
import { useCandidatesStore } from '@/stores/candidates'

const candidatesStore = useCandidatesStore()
const target = ref(null)
const draggable = ref(null)

// const { x, y, style } = useDraggable(draggable)

onClickOutside(target, () => {
  isOpen.value = false
})

const props = defineProps<{
  candidate: Candidate
}>()

const isOpen: Ref<boolean> = ref(false)

const fullName: ComputedRef<string> = computed(() => {
  return `${props.candidate.firstName} ${props.candidate.lastName}`
})

const formattedCreatedAt: ComputedRef<string> = useTimeAgo(
  props.candidate.createdAt as Date,
)

const editCandidate = () => {
  candidatesStore.setEditCandidate(props.candidate)
  candidatesStore.toggleEditCandidateModal(true)
}

const onDrag = () => {
  candidatesStore.setDraggedCandidate(props.candidate)
}
</script>

<template>
  <div
    draggable="true"
    ref="draggable"
    @drag.prevent="onDrag"
    class="w-full h-[87px] bg-slate-50 px-3 py-2 flex flex-col gap-2 rounded-xl ring-inset ring-1 ring-slate-200 cursor-pointer select-none"
  >
    <div class="flex items-center gap-2 relative">
      <p class="w-full font-semibold text-dark-blue truncate">
        {{ fullName }}
      </p>
      <hr-status-card-item-actions v-show="isOpen" @edit="editCandidate" />
      <button class="p-[3px]" @click="isOpen = !isOpen" ref="target">
        <icon-dots-vertical />
      </button>
    </div>
    <p class="w-full text-xs text-slate-500">Añadido por ATS</p>
    <p class="flex items-center gap-1 text-xs text-slate-500">
      <icon-clock />
      <span class="text-xs text-slate-400">{{ formattedCreatedAt }}</span>
    </p>
  </div>
</template>
