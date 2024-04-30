<template>
  <CHeader position="sticky" :class="headerClassNames">
    <CContainer class="border-bottom px-4" fluid>
      <CHeaderToggler @click="$store.commit('toggleSidebar')" style="margin-inline-start: -14px">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderNav class="ms-auto">
        <CNavItem>
          <CNavLink href="#">
            <CIcon icon="cil-bell" size="lg" />
          </CNavLink>
        </CNavItem>
      </CHeaderNav>
      <CHeaderNav>
        <li class="nav-item py-1">
          <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
        </li>
        <AppHeaderDropdownAccnt />
      </CHeaderNav>
    </CContainer>
    <CContainer class="px-4" fluid>
      <AppBreadcrumb />
    </CContainer>
  </CHeader>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useColorModes } from '@coreui/vue'
import AppBreadcrumb from '@/app/components/AppBreadcrumb.vue'
import AppHeaderDropdownAccnt from '@/app/components/header/AppHeaderDropdownAccnt.vue'
export default {
  name: 'AppHeader',
  components: {
    AppBreadcrumb,
    AppHeaderDropdownAccnt,
  },
  setup() {
    const headerClassNames = ref('mb-4 p-0')
    const { colorMode, setColorMode } = useColorModes('coreui-free-vue-admin-template-theme')

    onMounted(() => {
      document.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 0) {
          headerClassNames.value = 'mb-4 p-0 shadow-sm'
        } else {
          headerClassNames.value = 'mb-4 p-0'
        }
      })
    })

    return {
      headerClassNames,
      colorMode,
      setColorMode,
    }
  },
}
</script>
