import httpBase from '../../utils/http/http';

const usersModule = {
    namespaced:true,
    state: {
        users: [],
    },
    mutations: {
        setUsers(state, users) {
            state.users = users;
        }
    },
    actions: {
        async getUsers({ commit }) {
            try {
                const response = await httpBase.get("admin/users/get-all");
                commit('setUsers', response.data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
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
