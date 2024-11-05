<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import IconChevron from '@/components/icons/IconChevron.vue'
import HrAdminLogo from '@/components/HrAdminLogo.vue'
import HrAdminSubmenuItem from '@/components/HrAdminSubmenuItem.vue'

const isOpen: Ref<boolean> = ref(true)
const subMenuOpen: Ref<{ menu: string; open: boolean }> = ref({
  menu: 'talento',
  open: true,
})

const toggleSubMenu = (menu: string) => {
  subMenuOpen.value = {
    menu,
    open: !subMenuOpen.value.open,
  }
}

const toggleParentMenu = () => {
  isOpen.value = !isOpen.value
}

const isSubMenuOpen = (menu: string): boolean => {
  return subMenuOpen.value.menu === menu && subMenuOpen.value.open
}
</script>

<template>
  <div class="bg-white w-full max-w-64 shadow-sesame">
    <hr-admin-logo />
    <ul class="select-none px-2 py-3">
      <li @click="toggleParentMenu">
        <span
          class="uppercase text-xs text-slate-500 flex items-center justify-between cursor-pointer mb-2"
        >
          Administrador
          <IconChevron :class="{ 'rotate-180': !isOpen }" />
        </span>
        <ul
          v-show="isOpen"
          class="bg-slate-50 rounded-lg"
          :class="{ 'pb-2': isSubMenuOpen('talento') }"
        >
          <hr-admin-submenu-item
            title="Talento"
            :is-open="isSubMenuOpen('talento')"
            menu-key="talento"
            @toggle-menu="toggleSubMenu"
          >
            <RouterLink
              :to="{ name: 'home' }"
              class="w-full text-sesame-500 text-sm"
            >
              Reclutamiento
            </RouterLink>
          </hr-admin-submenu-item>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="postcss">
.router-link-active.router-link-exact-active {
  @apply font-semibold;
}
</style>
