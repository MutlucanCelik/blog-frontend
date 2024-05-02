<template>
  <div>
    <WidgetsStatsA class="mb-4" :userCount= userCount :articleCount= articleCount />
  </div>
</template>

<script>

import MainChart from '@/app/views/admin/pages/MainChart.vue'
import WidgetsStatsA from '@/app/components/admin/widgets/WidgetsStatsTypeA.vue'
import {appLocalStorage} from '@/app/utils/storage/storage.js';
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

export default {
  name: 'Dashboard',
  components: {
    MainChart,
    WidgetsStatsA,
  },
  setup() {
    const store = useStore();
    const userCount = computed(() => store.getters['usersModule/numberOfActiveUsers'])
    const articleCount = computed(() => store.getters['articlesModule/numberOfActiveArticles'])

    onMounted(() => {
      store.dispatch('getAdmin',appLocalStorage.getItem('id'))
      store.dispatch('usersModule/getUsers');
      store.dispatch('articlesModule/getArticles');
      

    });
  
    return {
      userCount,
      articleCount
    };
  },
}
</script>
