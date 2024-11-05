<script lang="ts" setup>
withDefaults(
  defineProps<{
    color?: string
    width?: number
    height?: number
  }>(),
  {
    color: '#94a3b8',
    width: 16,
    height: 16,
  },
)
</script>

<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 10L8 6L4 10"
      :stroke="color"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
