import httpBase from '../../utils/http/http';

const articlesModule = {
    namespaced:true,
    state: {
        articles: []
    },
    mutations: {
        setArticles(state, articles) {
            articles.forEach(article => article.image ? article.image = import.meta.env.VITE_BASE_URL + article.image.slice(1) : article.image = null);
            state.articles = articles;
        },
        setStatus(state,articleId){
            const article = state.articles.find(article => article.id == articleId);
            article.status = !article.status;
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
        },
        async changeStatus({commit},articleId){
            try {
                await httpBase.post("admin/articles/change-status", { article_id: articleId });
                commit('setStatus', articleId);
              } catch (error) {
                console.error('Error changing user status:', error);
              }
        },
        async getByDetail({commit},articleId){
            try{
                const response = await httpBase.get(`admin/articles/${articleId}`)
                const article = response.data.article
                const date = new Intl.DateTimeFormat('tr-TR').format(new Date(article.created_at));
                article.image ? article.image = import.meta.env.VITE_BASE_URL + article.image.slice(1) : article.image = null
                article.created_at = date
                return article;
            }catch(error){
                console.error('Error changing user status:', error);
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
