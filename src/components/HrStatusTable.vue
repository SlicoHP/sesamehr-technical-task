<script setup lang="ts">
import HrStatusCard from '@/components/HrStatusCard.vue'
import HrStatusCardItem from '@/components/HrStatusCardItem.vue'
import { useCandidatesStore } from '@/stores/candidates'
import { usePointerSwipe, useMousePressed } from '@vueuse/core'
import { ref, watch } from 'vue'

const candidatesStore = useCandidatesStore()

const emits = defineEmits<{
  (event: 'on-drop', statusId: string): void
}>()

const onDrop = (statusId: string) => {
  emits('on-drop', statusId)
}

const draggableContainer = ref<HTMLDivElement | null>(null)
const preventDrag = ref(false)

const { pressed } = useMousePressed({
  target: draggableContainer,
})

watch(pressed, newValue => {
  if (newValue) {
    preventDrag.value = false
  }
})

const { isSwiping, distanceX } = usePointerSwipe(draggableContainer, {
  threshold: 0,
  onSwipe() {
    if (draggableContainer.value && !preventDrag.value && pressed.value) {
      draggableContainer.value.scrollLeft += distanceX.value * 0.039
    }
  },
})
</script>

<template>
  <div class="flex h-full">
    <div
      class="flex w-full gap-3 overflow-x-auto no-scrollbar"
      ref="draggableContainer"
      :style="{
        cursor: isSwiping ? 'grabbing' : 'grab',
        userSelect: 'none',
      }"
    >
      <hr-status-card
        v-for="status in candidatesStore.candidateStatuses"
        :key="status.id"
        :status="status.name"
        @on-drop="onDrop(status.id)"
      >
        <hr-status-card-item
          v-for="candidate in candidatesStore.candidatesByStatus[status.id]"
          :key="candidate.id"
          :candidate="candidate"
        />
      </hr-status-card>
    </div>
  </div>
</template>
