<template>
  <CRow>
    <CCol :md="12">
      <CCard class="mb-4">
        <CCardHeader> Makaleler </CCardHeader>
        <CCardBody>

          <br />
          <v-card style="padding:0 1rem" >
            <v-card-title class="d-flex align-center pe-2">

              <v-text-field
                v-model="search"
                density="compact"
                label="Ara.."
                prepend-inner-icon="mdi-magnify"
                variant="solo-filled"
                flat
                hide-details
                single-line
              ></v-text-field>
            </v-card-title>

            <v-divider></v-divider>
            <v-data-table
              :items-per-page="5"
              :items-per-page-options="[10, 20, 30]"
              :headers="headers"
              v-model:search="search"
              :items="articles"
              no-data-text="Tabloda veri yok"
            >
              <template v-slot:item="{ item }">
                <tr>
                  <td>
                    <v-img
                      :src="item.image"
                      height="60"
                      width="60"
                      style="margin:0.5rem auto"
                      cover
                      rounded
                    ></v-img>
                  </td>
                  <td>{{ item.title }}</td>
                  <td>{{ item.category_id }}</td>
                  <td>{{ item.reading_time }} dakika</td>
                  <td>
                    <v-chip
                    :color="item.status ? 'green' : 'red'"
                    :text="item.status ? 'Aktif' : 'Pasif'"
                    class="text-uppercase"
                    size="small"
                    label
                    style="cursor:pointer;"
                    :data-id= item.id
                    @click="changeStatus"
                  ></v-chip>
                  </td>
                  <td>
                    <router-link :to="{name:'ArticleDetail',params:{articleId:item.id}}"  class="btn btn-sm btn-primary">Detay</router-link>
                  </td>
                </tr>
              </template>
            </v-data-table>
            <CModal 
                      :visible="detayModalStatus"
                      @close="() => { detayModalStatus = false }"
                      aria-labelledby="LiveDemoExampleLabel"
                    >
                      <CModalHeader>
                        <CModalTitle id="modal_title"></CModalTitle>
                      </CModalHeader>
                      <CModalBody id="modal_content"></CModalBody>
                    </CModal>
          </v-card>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
  import { computed, ref } from 'vue'
  import { useStore } from 'vuex'
  export default {
    setup(){
      const store = useStore();
      const articles = computed(() => store.state.articlesModule.articles);
      const search = ref('');

      const headers = [
        { title: 'Resim', align: 'center', key: 'image' },
        { title: 'Başlık', align: 'start', key: 'title' },
        { title: 'Kategori', align: 'start', key: 'category' },
        { title: 'Okuma süresi', align: 'start', key: 'reading_time' },
        { title: 'Durum', align: 'start', key: 'status' },
        { title: 'İşlemler', align: 'start', key: 'process' },
      ];

      const changeStatus = (e) => {
        const articleId = e.target.closest('.v-chip').getAttribute('data-id');
        store.dispatch('articlesModule/changeStatus',articleId)
      }

      return {
        articles,
        headers,
        search,
        changeStatus
      }
    }
  }
</script>

<style>

</style>