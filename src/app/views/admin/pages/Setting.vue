<template>
  <CCard class="mb-4">
    <CCardHeader>
      <strong>Genel Ayarlar</strong>
    </CCardHeader>
    <CCardBody>
      <DocsExample href="forms/form-control.html">
        <CForm>
          <div class="mb-3">
            <CFormLabel for="exampleFormControlInput1"
            >Footer başlık</CFormLabel
            >
            <CFormInput
                id="exampleFormControlInput1"
                type="text"
            />
          </div>
          <div class="mb-3">
            <CFormLabel for="exampleFormControlTextarea1"
            >Footer açıklama</CFormLabel
            >
            <CFormTextarea
                id="exampleFormControlTextarea1"
                rows="3"
            ></CFormTextarea>
          </div>
          <div class="mb-3">
            <CFormLabel for="logo">Logo</CFormLabel>
            <CFormInput id="logo" name="logo" type="file" />
          </div>
          <div class="mb-3">
            <CFormLabel for="home_slider_text"
            >Anasayfa slider yazısı</CFormLabel
            >
            <CFormInput
                id="home_slider_text"
                name="home_slider_text"
                type="text"
            />
          </div>
          <div class="mb-3">
            <CFormLabel for="home_slider_image">Anasayfa slider resmi</CFormLabel>
            <CFormInput id="home_slider_image" name="home_slider_image" type="file" />
          </div>
        </CForm>
      </DocsExample>
    </CCardBody>
  </CCard>
</template>

<script>
export default {

}
</script>

<style>

</style>