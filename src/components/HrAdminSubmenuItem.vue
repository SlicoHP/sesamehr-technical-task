<script lang="ts" setup>
import IconStar from '@/components/icons/IconStar.vue'
import IconChevron from '@/components/icons/IconChevron.vue'
import IconVerticalLine from '@/components/icons/IconVerticalLine.vue'

interface HrAdminSubmenuItemProps {
  title: string
  isOpen: boolean
  menuKey: string
}

defineProps<HrAdminSubmenuItemProps>()

defineEmits<{
  'toggle-menu': [menu: string]
}>()
</script>

<template>
  <li>
    <div
      class="flex items-center cursor-pointer px-2"
      @click.stop="$emit('toggle-menu', menuKey)"
    >
      <IconStar class="mr-1.5" />
      <div class="flex items-center justify-between w-full">
        <span class="py-2 text-sesame-500 text-sm">{{ title }}</span>
        <IconChevron color="#6C63FF" :class="{ 'rotate-180': !isOpen }" />
      </div>
    </div>
    <div v-show="isOpen" class="flex items-center w-full px-2">
      <IconVerticalLine class="w-3 mr-1.5" />
      <slot></slot>
    </div>
  </li>
</template>
