<script lang="ts" setup>
import HrTabMenuItem from '@/components/HrTabMenuItem.vue'

interface HrTabsMenuProps {
  activeTab: string
}

const emits = defineEmits<{
  'update:activeTab': [tab: string]
}>()

const props = defineProps<HrTabsMenuProps>()

const setActiveTab = (tab: string) => {
  emits('update:activeTab', tab)
}

const isActiveTab = (tab: string): boolean => {
  return props.activeTab === tab
}
</script>

<template>
  <ul class="flex items-stretch gap-12 pt-2 px-6 border-b border-slate-100">
    <hr-tab-menu-item
      title="Vacantes"
      @click="setActiveTab('vacantes')"
      :is-active="isActiveTab('vacantes')"
    />
    <hr-tab-menu-item
      title="Candidatos"
      @click="setActiveTab('candidatos')"
      :is-active="isActiveTab('candidatos')"
    />
  </ul>
</template>
