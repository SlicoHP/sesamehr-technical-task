<script lang="ts" setup>
import IconInbox from '@/components/icons/IconInbox.vue'
import IconConfetti from '@/components/icons/IconConfetti.vue'
import IconUser from '@/components/icons/IconUser.vue'
import IconBan from '@/components/icons/IconBan.vue'
import { computed } from 'vue'
import type { CandidateStatus } from '@/domain/models/Candidate'

const props = defineProps<{
  status: CandidateStatus['name']
}>()

const emits = defineEmits<{
  (event: 'on-drop'): void
}>()

const statusIcon = computed(() => {
  return {
    New: IconInbox,
    Accepted: IconUser,
    Interview: IconConfetti,
    Selected: IconConfetti,
    Discarded: IconBan,
  }[props.status]
})

const statusClass = computed(() => {
  return {
    New: 'bg-green-500',
    Accepted: 'bg-teal-500',
    Interview: 'bg-blue-500',
    Selected: 'bg-blue-500',
    Discarded: 'bg-not-selected',
  }[props.status]
})

const onDrop = () => {
  emits('on-drop')
}
</script>

<template>
  <div
    @dragover.prevent
    @drop.prevent="onDrop"
    class="min-w-[296px] h-full ring-inset ring-1 ring-slate-200 p-4 rounded-xl flex flex-col gap-2 select-none"
  >
    <div class="flex flex-col gap-2">
      <span class="block h-1 w-full rounded-sm" :class="statusClass"></span>
      <span class="flex items-center gap-1 py-1.5"
        ><component :is="statusIcon" />
        <span class="font-bold text-dark-blue" data-testid="status-text">{{
          status
        }}</span></span
      >
    </div>
    <slot />
  </div>
</template>

<style scoped>
.bg-not-selected {
  background-color: #ed6f6f;
}
</style>
