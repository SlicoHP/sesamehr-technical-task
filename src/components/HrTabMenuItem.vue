<script lang="ts" setup>
interface HrTabMenuItemProps {
  title: string
  isActive: boolean
}

defineProps<HrTabMenuItemProps>()
</script>

<template>
  <li
    class="tab flex flex-col gap-2 cursor-pointer pt-2"
    :class="{ 'active-tab': isActive }"
  >
    <span @click="$emit('click')" class="text-slate-200 block"
      >{{ title }}
    </span>
    <div class="relative -bottom-px h-0.5 rounded-t-sm"></div>
  </li>
</template>

<style scoped lang="postcss">
.tab {
  span {
    @apply text-slate-200;
  }
  div {
    @apply border-transparent;
  }
}
.active-tab {
  span {
    @apply text-sesame-500 font-bold;
  }
  div {
    @apply bg-sesame-500;
  }
}
</style>
