<script lang="ts" setup>
import IconPencil from '@/components/icons/IconPencil.vue'

const emits = defineEmits<{
  (e: 'edit'): void
}>()
</script>

<template>
  <div
    class="absolute -right-4 top-7 rounded-lg bg-slate-50 shadow-sesame-xl border border-slate-200"
  >
    <ul class="flex flex-col gap-2 p-2">
      <li>
        <button
          @click="emits('edit')"
          class="block rounded-sm text-dark-blue text-sm hover:bg-slate-200 w-full h-full px-2 py-1"
        >
          <span class="flex items-center gap-1">
            <icon-pencil />
            Editar
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>
