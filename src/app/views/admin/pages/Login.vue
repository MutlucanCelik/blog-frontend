<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Giriş</h1>
                  <p class="text-body-secondary">Tekrardan hoş geldiniz..</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                        placeholder="Email"
                        autocomplete="username"
                        type="text"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                        type="password"
                        placeholder="Password"
                        autocomplete="current-password"
                    />
                  </CInputGroup>
                  <CRow>
                    <router-link :to="{name:'Dashboard'}" class="w-100">
                    <CButton color="primary" class="px-4 w-100"> Giriş </CButton>
                      </router-link>
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
export default {
  name: 'Login',
}
</script>
