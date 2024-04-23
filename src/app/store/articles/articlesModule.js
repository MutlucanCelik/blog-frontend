import httpBase from '../../utils/http/http';

const articlesModule = {
    namespaced:true,
    state: {
        articles: []
    },
    mutations: {
        setArticles(state, articles) {
            state.articles = articles;
        }
    },
    actions: {
        async getArticles({ commit }) {
            try {
                const response = await httpBase.get("admin/articles/get-all");
                commit('setArticles', response.data.articles);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        
    },
    getters: {
        numberOfActiveArticles(state){
            return state.articles.filter(article => article.status).length;
        }
    }
}

export default articlesModule
