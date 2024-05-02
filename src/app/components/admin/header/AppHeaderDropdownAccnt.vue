<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
  </CDropdown>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex'

export default {
  name: 'AppHeaderDropdownAccnt',
  setup() {

    const store = useStore();
    const avatar = computed(()=> store.state.user?.image)
    return {
      avatar,
      itemsCount: 42,
    }
  },
}
</script>
