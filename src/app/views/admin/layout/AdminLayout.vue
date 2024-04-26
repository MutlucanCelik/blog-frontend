<template>
  <div>
    <AppSidebar />
    <div class="wrapper d-flex flex-column min-vh-100">
      <AppHeader />
      <div class="body flex-grow-1">
        <CContainer class="px-4" lg>
          <router-view />
        </CContainer>
      </div>
      <AppFooter />
    </div>
  </div>
</template>
<script>
import { CContainer } from '@coreui/vue'
import AppFooter from '@/app/components/AppFooter.vue'
import AppHeader from '@/app/components/header/AppHeader.vue'
import AppSidebar from '@/app/components/sidebar/AppSidebar.vue'

export default {
  name: 'DefaultLayout',
  components: {
    AppFooter,
    AppHeader,
    AppSidebar,
    CContainer,
  },
}
</script>

<style>
 .body{
  position: relative;
  z-index: 9991;
 }
 .sidebar{
  z-index: 9992 !important;
 }
 .swal2-container{
  z-index: 9993;
}
.modal-content{
  padding: 1rem !important;
}
</style>
