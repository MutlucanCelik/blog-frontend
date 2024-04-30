<template>
  <CCard class="mb-4">
    <CCardHeader>
      <strong>Genel Ayarlar</strong>
    </CCardHeader>
    <CCardBody>
        <Form  id="form_update" :validation-schema="settingSchema" @submit="handleSubmit">
          <div class="mb-5">
            <CFormLabel class="fw-semibold"
            >Footer başlık</CFormLabel
            >
            <Field
                name="footer_text"
                type="text"
                v-model="settings.footer_text"
                class="form-control"
                :validateOnInput="true" 
            />
            <ErrorMessage class="error-message" name="footer_text" />
          </div>
          <div class="mb-5">
            <CFormLabel class="fw-semibold"
            >Footer açıklama</CFormLabel
            >
            <Field
                as="textarea"
                name="description"
                type="text"
                v-model="settings.description"
                class="form-control"
                :validateOnInput="true" 
                rows="4"
            />
            <ErrorMessage class="error-message" name="description" />
          </div>
          <div class="mb-5">
            <CFormLabel for="logo" class="fw-semibold">Logo</CFormLabel>
             <Field
                name="logo"
                type="file"
                class="form-control"
                :validateOnInput="true"
            />
            <ErrorMessage class="error-message" name="logo" />
          </div>
          <div class="mb-5">
            <CFormLabel for="home_slider_text" class="fw-semibold"
            >Anasayfa slider yazısı</CFormLabel
            >
            <Field
                name="home_slider_text"
                type="text"
                class="form-control"
                v-model="settings.home_slider_text"
                :validateOnInput="true"
            />
             <ErrorMessage class="error-message" name="home_slider_text" />
          </div>
          <div class="mb-5">
            <CFormLabel for="home_slider_image" class="fw-semibold">Anasayfa slider resmi</CFormLabel>
            <Field
                name="home_slider_image"
                type="file"
                class="form-control"
             
                :validateOnBlur="true"
            />
            <ErrorMessage class="error-message" name="home_slider_image" />
          </div>

          <button type="submit" class="btn btn-md btn-primary w-100 text-white mt-4">Güncelle</button>
        </Form>
    </CCardBody>
  </CCard>
</template>

<script>
import { Field, Form, ErrorMessage } from 'vee-validate';
import {settingSchema} from '@/app/utils/validations/setting-schema.js'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue';
export default {
  components:{
    Field,Form,ErrorMessage
  },
  setup(){
    const store = useStore();
    const settings = computed(() => store.state.settingsModule.settings);

    onMounted(() => {
      store.dispatch('settingsModule/getSettings');
    });

    const handleSubmit = () => {
      store.dispatch('settingsModule/update','form_update');
    }

    return{
      settings,
      settingSchema,
      handleSubmit
    }
  }
}
</script>

<style scoped>
  #form_update{
    padding: 1rem 6rem;
  }
</style>

