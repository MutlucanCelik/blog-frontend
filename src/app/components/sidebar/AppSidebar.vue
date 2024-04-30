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
            <h4 class="p-0 m-0">Blog Panel</h4>
          </div>

      </RouterLink>
      <CCloseButton class="d-lg-none" dark @click="$store.commit('toggleSidebar')" />
    </CSidebarHeader>
    <router-link :to="{name:'Dashboard'}"> Gösterge Paneli</router-link>
    <router-link :to="{name:'User'}"> Kullanıcılar</router-link>
    <router-link :to="{name:'Category'}"> Kategoriler</router-link>
    <router-link :to="{name:'Article'}"> Makaleler</router-link>
    <router-link :to="{name:'Setting'}"> Ayarlar</router-link>
    <router-link @click="logout" :to="{name:'Login'}"> Çıkış</router-link>

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
    const store = useStore()

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
