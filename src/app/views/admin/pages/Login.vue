<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="login">
                  <h1>Giriş</h1>
                  <p class="text-body-secondary">Tekrardan hoş geldiniz..</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      type="text"
                      v-model="email"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      v-model="password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CButton type="submit" color="primary text-white" class="px-4 w-100">Giriş</CButton>
                    <div v-if="errorMessage" class="alert alert-danger mt-2 py-1">
                      {{ errorMessage }}
                    </div>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import httpBase from '@/app/utils/http/http.js';

export default {
  name: 'Login',
  setup() {
    const router = useRouter();
    const store = useStore();
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const login = async () => {
     if(!password.value || !email.value){
        errorMessage.value = 'Tüm alanlar zorunludur';
     }else{
       try {
        const response = await httpBase.post('auth/login', {
          login: email.value,
          password: password.value
        });

        if (response.status === 200) {
          if(response.data.user.role_id !== 1){
            errorMessage.value = 'Erişim izniniz bulunammakta';
          }else{
            store.commit('setUser', response.data.user);
            router.push({ name: 'Dashboard' });
            errorMessage.value = '';
            email.value = '';
            password.value = '';
          } 
          }
          
      } catch (error) {        
        if (error.response.status == 401) {
          errorMessage.value = 'Böyle bir kullanıcı bulunamadı';
        }else{
            errorMessage.value = 'Beklenmedik bir sorun oluştu, sayfayı yenileyin lütfen';
        }
      }
     }
    };

    return {
      email,
      password,
      login,
      errorMessage
    };
  }
};
</script>
