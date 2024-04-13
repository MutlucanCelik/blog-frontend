<template>
  <CRow>
    <CCol :md="12">
      <CCard class="mb-4">
        <CCardHeader> Kullanıcılar </CCardHeader>
        <CCardBody>

          <br />
          <CTable align="middle" class="mb-0 border" hover responsive>
            <CTableHead class="text-nowrap">
              <CTableRow>
                <CTableHeaderCell class="bg-body-secondary text-center">
                  <CIcon name="cil-people" />
                </CTableHeaderCell>
                <CTableHeaderCell class="bg-body-secondary ">
                  Ad
                </CTableHeaderCell>
                <CTableHeaderCell class="bg-body-secondary"> Soyad </CTableHeaderCell>
                <CTableHeaderCell class="bg-body-secondary ">
                  Email
                </CTableHeaderCell>
                <CTableHeaderCell class="bg-body-secondary">
                  Durum
                </CTableHeaderCell>
                <CTableHeaderCell class="bg-body-secondary"> İşlemler </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              /*Datayı burada bas*/
              <CTableRow v-for="item in tableExample" :key="item.name">
                <CTableDataCell class="text-center">
                  <CAvatar size="md" :src="item.avatar.src" :status="item.avatar.status" />
                </CTableDataCell>
                <CTableDataCell>
                  <div>{{ item.user.name }}</div>
                  <div class="small text-body-secondary text-nowrap">
                    <span>{{ item.user.new ? 'New' : 'Recurring' }}</span> |
                    {{ item.user.registered }}
                  </div>
                </CTableDataCell>
                <CTableDataCell class="text-center">
                  <CIcon size="xl" :name="item.country.flag" :title="item.country.name" />
                </CTableDataCell>
                <CTableDataCell>
                  <div class="d-flex justify-content-between align-items-baseline">
                    <div class="fw-semibold">{{ item.usage.value }}%</div>
                    <div class="text-nowrap text-body-secondary small ms-3">
                      {{ item.usage.period }}
                    </div>
                  </div>
                  <CProgress thin :color="item.usage.color" :value="item.usage.value" />
                </CTableDataCell>
                <CTableDataCell class="text-center">
                  <CIcon size="xl" :name="item.payment.icon" />
                </CTableDataCell>
                <CTableDataCell>
                  <div class="small text-body-secondary">Last login</div>
                  <div class="fw-semibold text-nowrap">
                    {{ item.activity }}
                  </div>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
export default {

}
</script>

<style>

</style>