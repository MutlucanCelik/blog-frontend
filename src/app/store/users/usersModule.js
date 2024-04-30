import httpBase from '../../utils/http/http';
import defaultImage from '@/assets/images/avatars/default_image.png';
import Swal from 'sweetalert2'



const usersModule = {
    namespaced:true,
    state: {
        users: [],
    },
    mutations: {
        setUsers(state, users) {
            users.forEach(user => user.image ? user.image = import.meta.env.VITE_BASE_URL + user.image.slice(1) : user.image = defaultImage);
            state.users = users;
        },
        setStatus(state, userId) {
            const user = state.users.find(user => user.id == userId)
            user.status = !user.status
        },
        updateUser(state,user){
            const index = state.users.findIndex(c => c.id == user.id)
            user.image ? user.image = import.meta.env.VITE_BASE_URL + user.image.slice(1) : user.image = defaultImage;
            state.users[index] = user;
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Başarılı",
                text:"Güncelleme başarıyla gerçekleştirildi",
                showConfirmButton: false,
                timer: 2000
              });
        }
    },
    actions: {
        async getUsers({ commit }) {
            try {
                const response = await httpBase.get("admin/users/get-all");
                const data = response.data.users.filter(user => user.role_id != 1)
                commit('setUsers', data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        async changeStatus({ commit }, userId) {
            try {
              await httpBase.post("admin/users/change-status", { user_id: userId });
              commit('setStatus', userId);
            } catch (error) {
              console.error('Error changing user status:', error);
            }
        },
        async getByDetail({commit},userId){
            try {
                const response = await httpBase.get(`admin/users/${userId}`);
                const user = response.data.user;
                user.image ? user.image = import.meta.env.VITE_BASE_URL + user.image.slice(1) : user.image = defaultImage;
                let date = new Intl.DateTimeFormat('tr-TR').format(new Date(user.created_at));
                user.created_at = date
                return user;
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        
        async update({commit},formId){
            try{
                const form = document.getElementById(`${formId}`)
                const formData = new FormData(form)
                const response = await httpBase.post("admin/users/update",formData,{
                    'Content-Type': 'multipart/form-data'
                });
                commit('updateUser',response.data.user)
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
        numberOfActiveUsers(state){
            return state.users.filter(user => user.status).length
        }
    }
}

export default usersModule
