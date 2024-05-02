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
import AppFooter from '@/app/components/admin/AppFooter.vue'
import AppHeader from '@/app/components/admin/header/AppHeader.vue'
import AppSidebar from '@/app/components/admin/sidebar/AppSidebar.vue'

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
.search-container .v-input__control{
  width: 50%;
}
.error-message{
  color: #d33;
  margin-top: 0.5rem;
}
</style>
