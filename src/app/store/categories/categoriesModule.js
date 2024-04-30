import  httpBase from "../../utils/http/http.js"
import defaultImage from '@/assets/images/empty-image.jpg';
import Swal from 'sweetalert2'

const categoriesModule = {
    namespaced:true,
    state: {
       categories:[]
    },
    mutations: {
        setCategories(state, categories) {
            categories.forEach(category => category.image ? category.image = import.meta.env.VITE_BASE_URL + category.image.slice(1) : category.image = defaultImage);
            state.categories = categories;
        },
        setStatus(state,categoryId){
            const category = state.categories.find(category => category.id == categoryId);
            category.status = !category.status;
        },
        setHighlightStatus(state,categoryId){
            const category = state.categories.find(category => category.id == categoryId);
            category.show_home_page_status = !category.show_home_page_status;
        },
        addCategory(state,category){
            category.image ? category.image = import.meta.env.VITE_BASE_URL + category.image.slice(1) : category.image = defaultImage;
            state.categories.push(category);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Başarılı",
                text: "Kategori başarıyla eklendi",
                showConfirmButton: false,
                timer: 2000
              }).then(() => {
                window.location.reload();
              });
        },
        updateCategory(state,category){
            const index = state.categories.findIndex(c => c.id == category.id)
            category.image ? category.image = import.meta.env.VITE_BASE_URL + category.image.slice(1) : category.image = defaultImage;
            state.categories[index] = category;
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Başarılı",
                text:"Kategori başarıyla gücellendi",
                showConfirmButton: false,
                timer: 2000
              });
        },
        deleteCategory(state,categoryId){
            state.categories = state.categories.filter(category => category.id != categoryId)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Başarılı",
                text: "Kategori başarıyla Silindi",
                showConfirmButton: false,
                timer: 2000
              }).then(() => {
                window.location.reload();
              });
              
        }
    },
    actions: {
        async getCategories({ commit }) {
            try {
                const response = await httpBase.get("admin/categories/get-all");
                commit('setCategories', response.data.categories);
            } catch (error) {   
                console.error('Error fetching users:', error);
            }
        },
        async getByDetail({commit},categoryId){
            try{
                const response = await httpBase.get(`admin/categories/${categoryId}`)
                const category = response.data.category
                const date = new Intl.DateTimeFormat('tr-TR').format(new Date(category.created_at));
                category.image ? category.image = import.meta.env.VITE_BASE_URL + category.image.slice(1) : category.image = defaultImage;
                category.created_at = date
                return category;
            }catch(error){
                console.error('Error changing user status:', error);
            }
        },
        async changeStatus({commit},categoryId){
            try {
                await httpBase.post("admin/categories/change-status", { category_id: categoryId });
                commit('setStatus', categoryId);
              } catch (error) {
                console.error('Error changing user status:', error);
              }
        },
        async changeHighlightStatus({commit},categoryId){
            try {
                await httpBase.post("admin/categories/change-highlight-status", { category_id: categoryId });
                commit('setHighlightStatus', categoryId);
              } catch (error) {
                console.error('Error changing user status:', error);
              }
        },
        async create({commit},formId) {
            try{
                const form = document.getElementById(`${formId}`)
                const formData = new FormData(form)
                const response = await httpBase.post("admin/categories/create",formData,{
                    'Content-Type': 'multipart/form-data'
                });
                commit('addCategory',response.data.category)
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
        },
        async update({commit},formId){
            try{
                const form = document.getElementById(`${formId}`)
                const formData = new FormData(form)
                const response = await httpBase.post("admin/categories/update",formData,{
                    'Content-Type': 'multipart/form-data'
                });
                commit('updateCategory',response.data.category)
            }catch(error){
                console.log(error.response.data)
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
        },
        async delete({commit},categoryId){
            try{
                await httpBase.delete(`admin/categories/${categoryId}/delete`);
                commit('deleteCategory',categoryId)
            }catch(error){
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Hata",
                    html:"Beklenmedik bir sorunla karşılaşıldı sayfayı yenileyin lütfen.",
                    confirmButtonText: "Tamam",
                });
            }
        }
    },
    getters: {
        
    }
}

export default categoriesModule
