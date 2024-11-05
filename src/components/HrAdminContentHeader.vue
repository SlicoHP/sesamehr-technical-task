<script lang="ts" setup>
import IconSearch from '@/components/icons/IconSearch.vue'

const emits = defineEmits(['addCandidate'])

const addCandidate = () => {
  emits('addCandidate')
}
</script>

<template>
  <div class="flex">
    <div class="relative flex-1">
      <div class="absolute left-3 inset-y-0 flex items-center">
        <span class="">
          <icon-search />
        </span>
      </div>
      <input
        type="text"
        class="bg-slate-50 gap-2 pr-3 ring-1 ring-inset ring-slate-200 text-slate-400 text-sm rounded-xl py-2 pl-[34px] max-w-[248px] w-full"
        placeholder="Buscar"
      />
    </div>
    <button
      @click="addCandidate"
      class="bg-dark-blue text-white rounded-xl px-3 py-[7px] text-sm w-full max-w-[134px]"
    >
      Añadir candidato
    </button>
  </div>
</template>
