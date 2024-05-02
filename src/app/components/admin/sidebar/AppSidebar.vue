<template>
  <CSidebar
    class="border-end"
    colorScheme="dark"
    position="fixed"
    :unfoldable="sidebarUnfoldable"
    :visible="sidebarVisible"
    @visible-change="
      (event) =>
        $store.commit({
          type: 'updateSidebarVisible',
          value: event,
        })
    "
  >
    <CSidebarHeader class="border-bottom">
      <RouterLink custom to="/">

          <div class="d-flex justify-content-center w-100">
            <router-link style="text-decoration:none;color:inherit" :to="{name:'Dashboard'}">
              <h4 class="p-0 m-0">Blog Panel</h4>
            </router-link>
          </div>

      </RouterLink>
      <CCloseButton class="d-lg-none" dark @click="$store.commit('toggleSidebar')" />
    </CSidebarHeader>
    <router-link class="sidebar-link" :class="{active: $route.name == 'Dashboard'}" :to="{name:'Dashboard'}"><CIcon icon="cil-speedometer" size="md" class="me-2" /> Gösterge Paneli</router-link>
    <router-link class="sidebar-link" :class="{active: $route.path.includes('/users')}" :to="{name:'User'}"> <CIcon icon="cil-user" size='md' class="me-2" /> Kullanıcılar</router-link>
    <router-link class="sidebar-link" :class="{active: $route.path.includes('/categories')}" :to="{name:'Category'}"><CIcon icon="cil-playlist-add" size='md' class="me-2" /> Kategoriler</router-link>
    <router-link class="sidebar-link" :class="{active: $route.path.includes('/articles')}" :to="{name:'Article'}"><CIcon icon="cil-notes" size='md' class="me-2" /> Makaleler</router-link>
    <router-link class="sidebar-link" :class="{active: $route.path.includes('/settings')}" :to="{name:'Setting'}"><CIcon icon="cil-settings" size='md' class="me-2" /> Ayarlar</router-link>
    <router-link class="sidebar-link" @click="logout" :to="{name:'Login'}"><CIcon icon="cil-account-logout" size='md' class="me-2" /> Çıkış</router-link>

  </CSidebar>
</template>

<script>
import {appLocalStorage} from '@/app/utils/storage/storage.js';
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useStore } from 'vuex'
import { logo } from '@/assets/brand/logo'
import {CCardText} from "@coreui/vue/dist/esm/components/card/index.js";
export default {
  name: 'AppSidebar',
  components: {
    CCardText,
    RouterLink,
  },
  setup() {
    const store = useStore();
    const logout = () => {
      appLocalStorage.removeItem('id');
    }
    return {
      logo,
      logout,
      sidebarUnfoldable: computed(() => store.state.sidebarUnfoldable),
      sidebarVisible: computed(() => store.state.sidebarVisible),
    }
  },
}
</script>
<style>
  .sidebar-link{
    text-decoration: none;
    color: inherit;
    padding: 0.6rem 1rem;
    transition: 0.2s;
  }
  .sidebar-link:hover{
    background-color: #2a303d;
  }
  .sidebar-link.active{
    background-color: #2a303d;
  }
</style>
