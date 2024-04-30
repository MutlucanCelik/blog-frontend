import  httpBase from "../../utils/http/http.js"
import Swal from 'sweetalert2'

const settingsModule = {
    namespaced:true,
    state: {
        settings: []
    },
    mutations: {
       setSettings(state,settings){
            settings.logo_image ? settings.logo_image = import.meta.env.VITE_BASE_URL + settings.logo_image.slice(1) : settings.logo_image = null;
            settings.home_slider_image ? settings.home_slider_image = import.meta.env.VITE_BASE_URL + settings.home_slider_image.slice(1) : settings.home_slider_image = null;
            state.settings = settings
       },
       updateSettings(state,settings){
            settings.logo_image ? settings.logo_image = import.meta.env.VITE_BASE_URL + settings.logo_image.slice(1) : settings.logo_image = null;
            settings.home_slider_image ? settings.home_slider_image = import.meta.env.VITE_BASE_URL + settings.home_slider_image.slice(1) : settings.home_slider_image = null;
            state.settings = settings
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Başarılı",
                text:"Ayarlar başarıyla güncellendi",
                showConfirmButton: false,
                timer: 2000
              });
       }
    },
    actions: {
       async getSettings({commit}){
        const response = await httpBase.get('admin/settings/get-settings');
        commit('setSettings',response.data.settings[0]);
       },
       async update({commit},formId){
        try{
            const form = document.getElementById(`${formId}`)
            const formData = new FormData(form);
            const response = await httpBase.post('admin/settings/update',formData,{
                'Content-Type': 'multipart/form-data'
            });
            commit('updateSettings',response.data.settings)
           
        }catch(error){
            const errors = error.response.data.errors;
            let errorMessage ="";

            for (const key in errors) {
                errorMessage += `<div class='fw-semibold'>${errors[key]}</div>`;
              }
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Hata",
                html:errorMessage,
                confirmButtonText: "Tamam",
            });
        }
       }
    },
    getters: {
        
    }
}

export default settingsModule
