<template>
  <CRow>
    <CCol :md="12">
      <CCard class="mb-4">
        <CCardHeader> Kategoriler </CCardHeader>
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
                class="search-container"
              ></v-text-field>
               <CButton  class="btn btn-md btn-success text-white"  @click="() => createModalStatus = true">Kategori ekle</CButton>
            </v-card-title>
            <v-divider></v-divider>
            <v-data-table
              :key="categories.length"
              :items-per-page="5"
              :items-per-page-options="[10, 20, 30]"
              :headers="headers"
              v-model:search="search"
              :items="categories"
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
                  <td>{{ item.name }}</td>
                  <td class="text-center">{{ item.parent_id || '-' }}</td>
                  <td class="text-center">{{ item.order }}</td>
                  <td class="text-center">
                    <v-chip
                    :color="item.show_home_page_status ? 'green' : 'red'"
                    :text="item.show_home_page_status ? 'Aktif' : 'Pasif'"
                    class="text-uppercase"
                    size="small"
                    label
                    style="cursor:pointer;"
                    :data-id= item.id
                    @click="changeHighlightStatus"
                  ></v-chip>
                  </td>
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
                 <td class="text-center">
                    <CButton class="btn-detail me-1" style="color:white!important" size="sm" color="primary" @click="detail(item.id)">Detay</CButton>
                    <CButton class="btn-update me-1" style="color:white!important" size="sm" color="warning" @click="updateCategory(item.id)">Güncelle</CButton>
                    <CButton class="btn-delete" style="color:white!important" size="sm" color="danger" @click="deleteCategory(item.id)">Sil</CButton>
                  </td>
                  
                </tr>
              </template>
            </v-data-table>
            <CModal 
              :visible="createModalStatus"
              @close="() => { createModalStatus = false }"
              aria-labelledby="LiveDemoExampleLabel"
            >
              <CModalHeader>
                <CModalTitle id="modal_title">Kategori ekle</CModalTitle>
              </CModalHeader>
              <CModalBody id="modal_content">
                <Form id="form_create" :validation-schema="createCategorySchema" @submit="handleCreateSubmit">
                  <div class="mb-3">
                    <CFormLabel for="name">Kategori adı</CFormLabel>
                    <Field name="name" id="name" type="text" :validateOnInput="true" class="form-control"/>
                    <ErrorMessage class="error-message" name="name" />
                  </div>
                  <div class="mb-3">
                    <CFormLabel for="image">Resim</CFormLabel>
                    <Field name="image" id="image" type="file" class="form-control"/>
                    <ErrorMessage class="error-message" name="image" />
                  </div>
                  <div class="mb-3">
                    <CFormLabel for="exampleFormControlInput1">Üst kategori</CFormLabel>
                    <Field name="parent_id" :validateOnInput="true" as="select" class="form-select">
                      <option value="">Seçim yapın</option>
                      <option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
                    </Field>
                    <ErrorMessage class="error-message" name="parent_id" />
                  </div>
                  <div class="mb-3">
                    <CFormLabel for="order">Sırası</CFormLabel>
                    <CFormInput name="order" id="order" type="number" placeholder=""/>
                  </div>
                  <div class="mb-3">
                    <CFormCheck name="status" id="status" label="Durum" placeholder=""/>
                  </div>
                  <div class="mb-3">
                    <CFormCheck name="show_home_page_status" label="Öne çıkar" id="show_home_page_status" placeholder=""/>
                  </div>
                  <button type="submit" class="btn btn-md btn-success w-100 text-white">Ekle</button>
                </Form>
              </CModalBody>
            </CModal>

            <CModal 
              :visible="updateModalStatus"
              @close="() => { updateModalStatus = false }"
              aria-labelledby="LiveDemoExampleLabel"
            >
              <CModalHeader>
                <CModalTitle id="modal_title">Kategori güncelle</CModalTitle>
              </CModalHeader>
              <CModalBody id="modal_content">
                <Form id="form_update" :validation-schema="updateCategorySchema" @submit="handleUpdateSubmit">
                  <input name="id" type="hidden" :value="categoryToUpdate.id">
                  <div class="mb-3">
                    <CFormLabel for="name">Kategori adı</CFormLabel>
                    <Field :validateOnInput="true" class="form-control" name="name" id="name" type="text" v-model="categoryToUpdate.name"/>
                    <ErrorMessage class="error-message" name="name" />
                  </div>
                  <div class="mb-3">
                    <CFormLabel for="image">Resim</CFormLabel>
                    <Field class="form-control" name="image" id="image" type="file"/>
                    <ErrorMessage class="error-message" name="image" />
                  </div>
                  <div class="mb-3">
                    <CFormLabel for="exampleFormControlInput1">Üst kategori</CFormLabel>
                    <Field v-model= categoryToUpdate.parent_id  :validateOnInput="true" class="form-select" name="parent_id" as="select" >
                      <option value="">Seçim yapın</option>
                      <option v-for="category in categories.filter(c => c.id != categoryToUpdate.id)" :key="category.id" :value="category.id">{{category.name}}</option>
                    </Field>
                    <ErrorMessage class="error-message" name="parent_id" />
                  </div>
                  <div class="mb-3">
                    <CFormLabel for="order">Sırası</CFormLabel>
                    <CFormInput name="order" id="order" type="number" :value="categoryToUpdate.order" placeholder=""/>
                  </div>
                  <div class="mb-3">
                    <CFormCheck name="status" id="status" label="Durum" :checked="categoryToUpdate.status" placeholder=""/>
                  </div>
                  <div class="mb-3">
                    <CFormCheck name="show_home_page_status" label="Öne çıkar" id="show_home_page_status" :checked="categoryToUpdate.show_home_page_status" placeholder=""/>
                  </div>
                  <button type="submit" class="btn btn-md btn-primary w-100 text-white">Güncelle</button>
                </Form>
              </CModalBody>
            </CModal>

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
import { Field, Form, ErrorMessage } from 'vee-validate';
import {createCategorySchema,updateCategorySchema} from '@/app/utils/validations/category-schema.js'
  import { computed, onMounted, ref } from 'vue'
  import { useStore } from 'vuex'
  import Swal from 'sweetalert2'
  export default {
    components:{
      Field,
      Form,
      ErrorMessage
    },
    setup(){
      const store = useStore();
      const categories = computed(() => store.state.categoriesModule.categories);
      const search = ref('');
      const categoryToUpdate = ref('');
      let detayModalStatus = ref(false);
      let updateModalStatus = ref(false);
      let createModalStatus = ref(false);


      const headers = [
        { title: 'Resim', align: 'center', key: 'image' },
        { title: 'Adı', align: 'start', key: 'name' },
        { title: 'Üst kategori', align: 'center', key: 'parent_category' },
        { title: 'Sırası', align: 'center', key: 'order' },
        { title: 'Öne çıkarma durumu', align: 'center', key: 'show_home_page_status' },
        { title: 'Durum', align: 'start', key: 'status' },
        { title: 'İşlemler', align: 'center', key: 'process' },
      ];
      
      const changeStatus = (e) => {
        const categoryId = e.target.closest('.v-chip').getAttribute('data-id');
        store.dispatch('categoriesModule/changeStatus',categoryId);
      }

       const changeHighlightStatus = (e) => {
        const categoryId = e.target.closest('.v-chip').getAttribute('data-id');
        store.dispatch('categoriesModule/changeHighlightStatus',categoryId);
      }

      const detail = async(categoryId) => {
        detayModalStatus.value = true;
        const category = await store.dispatch('categoriesModule/getByDetail',categoryId)
        document.getElementById('modal_title').textContent = `${category.name}  Detay`
        document.getElementById('modal_content').innerHTML = `
          <div class='d-flex justify-content-center mb-5'><img style='width:140px;height:140px;border-radius:0.5rem' src='${category.image}' /></div>
          <div style='margin:0.5rem 0'>
            <span style='width:120px;display:inline-block' class='fw-semibold'>Kategori adı</span>
            :
            <span class='ms-2'>${category.name}</span>
          </div>
          <div style='margin-bottom:0.5rem'>
            <span style='width:120px;display:inline-block' class='fw-semibold'>Sırası</span>
            :
            <span class='ms-2'>${category.order}</span>
          </div>
          <div style='margin-bottom:0.5rem'>
            <span style='width:120px;display:inline-block' class='fw-semibold'>Durum</span>
            :
            <span class='ms-2'>${category.status ? 'Aktif' : 'Pasif'}</span>
          </div>
          <div style='margin-bottom:0.5rem'>
            <span style='width:auto;display:inline-block' class='fw-semibold'>Öne çıkarma durumu</span>
            :
            <span class='ms-2'>${category.show_home_page_status ? 'Aktif' : 'Pasif'}</span>
          </div>
          <div style='margin-bottom:0.5rem'>
            <span style='width:auto;display:inline-block' class='fw-semibold'>Kayıt oluşturma tarihi</span>
            :
            <span class='ms-2'>${category.created_at}</span>
          </div>
        `
      }

      const handleCreateSubmit= () => {
        store.dispatch('categoriesModule/create',"form_create")
        createModalStatus.value = false
      }

      const handleUpdateSubmit = () => {
        store.dispatch('categoriesModule/update',"form_update")
        updateModalStatus.value = false
      }

      const updateCategory = async (categoryId) => {
        categoryToUpdate.value = await store.dispatch('categoriesModule/getByDetail',categoryId)
        updateModalStatus.value = true;
      }

      const deleteCategory = (categoryId) => {
        Swal.fire({
          title: "Eminmisini ?",
          text: "Kategoriyi silmek istediğinize eminmisiniz !",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText:"Hayır",
          confirmButtonText: "Evet",
          confirmButtonColor: "#d33"
        }).then((result) => {
          if (result.isConfirmed) {
            store.dispatch('categoriesModule/delete',categoryId)
          }
        })
      }


      onMounted(() => {
        store.dispatch('categoriesModule/getCategories')
      })
      return {
        categories,
        headers,
        search,
        changeStatus,
        detail,
        updateCategory,
        handleUpdateSubmit,
        handleCreateSubmit,
        deleteCategory,
        changeHighlightStatus,
        detayModalStatus,
        updateModalStatus,
        createModalStatus,
        categoryToUpdate,
        createCategorySchema,
        updateCategorySchema
      }
    }
  }
</script>

<style>

</style>