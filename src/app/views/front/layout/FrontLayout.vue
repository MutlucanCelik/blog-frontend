<template>
  
   <header class="">
      <nav class="navbar navbar-expand-lg">
        <div class="container">
          <router-link class="navbar-brand" :to="{name:'Home'}"><h2>Blog Front<em>.</em></h2></router-link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <nav style="background-color:#ddd" class="navbar navbar-expand-lg">
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav mx-auto">
              <li v-for="category in categories" :key="category.id" class="nav-item">
                <router-link :to="{name:'Home'}" class="nav-link">{{category.name}}
                </router-link>
              </li> 
            </ul>
          </div>
      </nav>
    </header>
        <router-view></router-view>
    <footer>
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <ul class="social-icons">
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Behance</a></li>
              <li><a href="#">Linkedin</a></li>
              <li><a href="#">Dribbble</a></li>
            </ul>
          </div>
          <div class="col-lg-12">
            <div class="copyright-text">
              <p>Copyright 2020 Stand Blog Co.
                    
                 | Design: <a rel="nofollow" href="https://templatemo.com" target="_parent">TemplateMo</a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
    
export default {

  setup(){
    const store = useStore();
    const categories = computed(() => store.state.categoriesModule.categories.filter(c => !c.parent_id))
    onMounted(() => {
      store.dispatch("categoriesModule/getCategories");
    })

    return {
      categories
    }
  }
}
</script>
<style src="@/assets/styles/css/fontawesome.css"></style>
<style src="@/assets/styles/css/templatemo-stand-blog.css"></style>
<style src="@/assets/styles/css//owl.css"></style>
<style scoped>
header{
    position: static;
}
</style>