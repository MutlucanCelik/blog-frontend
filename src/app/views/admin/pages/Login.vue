<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <Form :validation-schema='loginSchema' @submit="login">
                  <h1>Giriş</h1>
                  <p class="text-body-secondary">Tekrardan hoş geldiniz..</p>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <Field
                      placeholder="Email"
                      type="text"
                      v-model="email"
                      class="form-control"
                      name='login'
                      :validateOnBlur='false'
                    />
                  </CInputGroup>
                  <ErrorMessage class="error-message" name='login'/>
                  <CInputGroup class="mt-3">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <Field
                      type="password"
                      placeholder="Password"
                      v-model="password"
                      class="form-control"
                      name='password'
                      :validateOnBlur='false'
                    />
                  </CInputGroup>
                  <ErrorMessage class="error-message" name='password'/>
                  <CRow class="px-3">
                    <CButton type="submit" color="primary text-white" class="px-4 mt-4 w-100">Giriş</CButton>
                    <div v-if="errorMessage" class="alert alert-danger mt-2 py-1">
                      {{ errorMessage }}
                    </div>
                  </CRow>
                </Form>
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
import httpBase from '@/app/utils/http/http.js';
import {appLocalStorage} from '@/app/utils/storage/storage.js';
import {loginSchema} from '@/app/utils/validations/auth-schema.js'
import {Form, Field, ErrorMessage} from 'vee-validate'

export default {
  name: 'Login',
  components:{Form, Field, ErrorMessage},
  setup() {
    const router = useRouter();
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
            appLocalStorage.setItem('id',response.data.user.id)
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
      errorMessage,
      loginSchema
    };
  }
};
</script>
<style scoped>
  .error-message{
    color: #d33;
    margin-top: 0.5rem;
  }
</style>
