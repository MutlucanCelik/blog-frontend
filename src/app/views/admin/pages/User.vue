<template>
  <CRow>
    <CCol :md="12">
      <CCard class="mb-4">
        <CCardHeader> Kullanıcılar </CCardHeader>
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
              :items="users"
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
                  <td>{{ item.first_name }}</td>
                  <td>{{ item.last_name }}</td>
                  <td>{{ item.email }}</td>
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
                    <CButton class="btn-detail me-1" style="color:white!important" size="sm" color="primary" @click="detail(item.id)">Detay</CButton>
                    <CButton class="btn-update" style="color:white!important" size="sm" color="warning" @click="updateUser(item.id)">Güncelle</CButton>
                  </td>
                </tr>
              </template>
            </v-data-table>

             <CModal 
              :visible="updateModalStatus"
              @close="() => { updateModalStatus = false }"
              aria-labelledby="LiveDemoExampleLabel"
            >
              <CModalHeader>
                <h5 class="m-0" ref="modalTitle" ></h5>
              </CModalHeader>
              <CModalBody>
                <Form id="form_update" :validation-schema="userSchema"  @submit="handleUpdateSubmit">
                  <input type="hidden" name="user_id" :value="userToUpdate.id">
                  <div class="mb-3">
                    <CFormLabel for="first_name">Ad</CFormLabel>
                    <Field name="first_name" id="first_name" class="form-control"  :validateOnInput="true" type="text" v-model="userToUpdate.first_name"/>
                    <ErrorMessage class="error-message" name="first_name" />
                  </div>
                  <div class="mb-3">
                    <CFormLabel for="last_name">Soyad</CFormLabel>
                    <Field name="last_name" id="last_name" class="form-control" :validateOnInput="true" type="text" v-model="userToUpdate.last_name"/>
                     <ErrorMessage class="error-message" name="last_name" />
                  </div>
                  <div class="mb-3">
                    <CFormLabel for="image">Resim</CFormLabel>
                    <Field name="image" id="image" class="form-control" type="file"/>
                     <ErrorMessage class="error-message" name="image" />
                  </div>
                  <div class="mb-3">
                    <CFormLabel for="email">Email</CFormLabel>
                    <Field name="email" id="email" class="form-control" :validateOnInput="true" type="email" v-model="userToUpdate.email"/>
                     <ErrorMessage class="error-message" name="email" />
                  </div>
                  <button type="submit" class="btn btn-md btn-primary w-100 text-white mt-3">Güncelle</button>
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
import {userSchema} from '@/app/utils/validations/user-schema.js'
import {Form, Field, ErrorMessage} from 'vee-validate'
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'User',
  components:{
    Form,
    Field,
    ErrorMessage
  },

  setup() {
    const store = useStore();
    const users = computed(() => store.state.usersModule.users);
    const search = ref('');
    const modalTitle = ref(null)
    const userToUpdate = ref('');
    let detayModalStatus = ref(false);
    let updateModalStatus = ref(false);

    const headers = [
      { title: 'Resim', align: 'center', key: 'image' },
      { title: 'Ad', align: 'start', key: 'first_name' },
      { title: 'Soyad', align: 'start', key: 'last_name' },
      { title: 'Email', align: 'start', key: 'email' },
      { title: 'Durum', align: 'start', key: 'status' },
      { title: 'İşlemler', align: 'start', key: 'process' },
    ];

    const changeStatus = (e) => {
        const userId = e.target.closest('.v-chip').getAttribute('data-id');
        store.dispatch('usersModule/changeStatus',userId);
    }
    const detail = async(userId) => {
      detayModalStatus.value = true;
      const user = await store.dispatch('usersModule/getByDetail',userId);
      document.getElementById('modal_title').textContent = `${user.first_name} ${user.last_name}  Detay`
      document.getElementById('modal_content').innerHTML = `
        <div class='d-flex justify-content-center mb-5'><img style='width:140px;height:140px;border-radius:0.5rem' src='${user.image}' /></div>
        <div style='margin:0.5rem 0'>
          <span style='width:80px;display:inline-block' class='fw-semibold'>İsim</span>
          :
          <span class='ms-2'>${user.first_name}</span>
        </div>
        <div style='margin-bottom:0.5rem'>
          <span style='width:80px;display:inline-block' class='fw-semibold'>Soyad</span>
          :
          <span class='ms-2'>${user.last_name}</span>
        </div>
        <div style='margin-bottom:0.5rem'>
          <span style='width:80px;display:inline-block' class='fw-semibold'>Email</span>
          :
          <span class='ms-2'>${user.email}</span>
        </div>
        <div style='margin-bottom:0.5rem'>
          <span style='width:80px;display:inline-block' class='fw-semibold'>Durum</span>
          :
          <span class='ms-2'>${user.status ? 'Aktif' : 'Pasif'}</span>
        </div>
        <div style='margin-bottom:0.5rem'>
          <span style='width:auto;display:inline-block' class='fw-semibold'>Kayıt oluşturma tarihi</span>
          :
          <span class='ms-2'>${user.created_at}</span>
        </div>
      `
      
    }

    const updateUser = async (userId) => {
      updateModalStatus.value = true
      userToUpdate.value = await store.dispatch('usersModule/getByDetail',userId);
      modalTitle.value.innerText = userToUpdate.value.first_name + ' ' + userToUpdate.value.last_name + ' güncelle';
    }

    const handleUpdateSubmit = () => {
        store.dispatch('usersModule/update','form_update')
        updateModalStatus.value = false;
    }

    return {
      users,
      headers,
      search,
      changeStatus,
      detayModalStatus,
      updateModalStatus,
      modalTitle,
      handleUpdateSubmit,
      userToUpdate,
      detail,
      updateUser,
      userSchema
    };
  },
};
</script>

<style>
  .modal{
    display: flex !important;
    justify-content: center;
    align-items: center;
  }
  .modal-content{
    min-width: 500px;
  }
</style>
