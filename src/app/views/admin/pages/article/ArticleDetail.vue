<template>
<div v-if="article.image" class="article-container">
    <img :src="article.image" alt="">
</div>
    <hr>
    <div class="propery-container">
        <span class="fw-semibold">Yazar</span>:
        <span>{{article.user_id}}</span>
  </div>
  <hr>
  <div class="propery-container">
        <span class="fw-semibold">Kategori</span>:
        <span>{{article.category_id}}</span>
  </div>
  <hr>
  <div class="propery-container">
        <span class="fw-semibold">Durum</span>:
        <span>{{article.status ? 'Aktif' : 'Pasif'}}</span>
  </div>
  <hr>
  <div class="propery-container">
        <span class="fw-semibold">Beğeni sayısı</span>:
        <span>{{article.article_likes_count}}</span>
  </div>
  <hr>
  <div class="propery-container">
        <span class="fw-semibold">Oluşturulma tarihi</span>:
        <span>{{article.created_at}}</span>
  </div>
  <hr>
  <div class="propery-container">
        <span class="fw-semibold">Okuma süresi</span>:
        <span>{{article.reading_time}} dakika</span>
  </div>
  <hr>
  <div class="propery-container">
        <span class="fw-semibold">Başlık</span>:
        <span>{{article.title}}</span>
  </div>
  <hr>
  <div class="propery-container">
        <span class="fw-semibold">İçerik</span>:
        <p>{{article.body}}</p>
  </div>
  <hr>
  <h3 style="margin-bottom:1rem;">Yorumlar</h3>
  <div class="propery-container">
        <div style="margin-bottom:2.5rem" v-for="comment in article.get_comments" :key="comment.id">
            <div v-if="!comment.parent_id">
                <div>
                    <span class="fw-semibold">Kullanıcı</span>:
                    <span>{{comment.user.first_name}} {{comment.user.last_name}}</span>
                </div>
                <div>
                    <span class="fw-semibold">Yorum</span>:
                    <span>{{comment.comment}}</span>
                </div>
            </div>
            <div  class="sub-container propery-container" v-for="subComment in article.get_comments" :key="subComment.id">
                <div v-if="subComment.parent_id == comment.id">
                    <div>
                    <span class="fw-semibold">Kullanıcı</span>:
                    <span>{{subComment.user.first_name}} {{subComment.user.last_name}}</span>
                </div>
                <div>
                    <span class="fw-semibold">Yorum</span>:
                    <span>{{subComment.comment}}</span>
                </div>
                </div>
            </div>
        </div>
  </div>
  <hr>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex'

export default {
    props:['articleId'],
    setup(props){
        const store = useStore();
        const article = ref('')

        onMounted(async () => {
            const data = await store.dispatch('articlesModule/getByDetail',props.articleId);
            article.value = data
        })
        return{
            article
        }
    }
}
</script>

<style scoped>
    .article-container{
        display: flex;
        justify-content: center;
        margin-bottom: 4rem;
    }
    .article-container img{
         width: 300px;
        height: 300px;
    }
    .propery-container{
        margin-bottom: 1rem;
    }
    .sub-container{
        margin-left: 2rem;
    }
</style>