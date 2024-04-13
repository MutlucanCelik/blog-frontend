<template>
  <CBreadcrumb class="my-0">
    <div
      v-for="item in breadcrumbs"
      :key="item"
    >
      {{ item?.name }}
    </div>
  </CBreadcrumb>
</template>

<script>
import { onMounted, ref } from 'vue'
import router from '@/app/router'
import routeNames from "@/app/utils/helpers/route-tr-names.js";

export default {
  name: 'AppBreadcrumb',
  setup() {
    const breadcrumbs = ref()

    const getBreadcrumbs = () => {
      return router.currentRoute.value.matched.map((route) => {

        if(!route.children.length){
          const routeName = routeNames[route.name] || route.name;
          return {
            active: route.path === router.currentRoute.value.fullPath,
            name: routeName,
            path: `${router.options.history.base}${route.path}`,
          }
        }
      })
    }

    router.afterEach(() => {
      breadcrumbs.value = getBreadcrumbs()
    })

    onMounted(() => {
      breadcrumbs.value = getBreadcrumbs()
    })

    return {
      breadcrumbs,
    }
  },
}
</script>
