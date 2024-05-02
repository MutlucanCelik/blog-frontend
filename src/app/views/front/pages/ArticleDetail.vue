<template>
    <!-- Page Content -->
    <!-- Banner Starts Here -->
    <div class="heading-page header-text">
      <section class="page-heading">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="text-content">
                <h2>{{article.title}}</h2>
                <h4>{{article.user_id}}</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
    <!-- Banner Ends Here -->

    <section class="blog-posts grid-system">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="all-blog-posts">
              <div class="row">
                <div class="col-lg-12">
                  <div class="blog-post">
                    <div class="blog-thumb">
                      <img src="@/assets/images/react.jpg" alt="">
                    </div>
                    <div class="down-content">
                      <span>{{article.title}}</span>
                      <ul class="post-info">
                        <li><a href="#">{{article.user_id}}</a></li>
                        <li><a href="#">{{article.created_at}}</a></li>
                        <li><a href="#">{{article.reading_time}} dk</a></li>
                      </ul>
                        <p>{{article.body}}</p>                      
                    </div>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="sidebar-item comments">
                    <div class="sidebar-heading">
                      <h2>{{article.get_comments?.length}} Yorum</h2>
                    </div>
                    <div class="content comments">
                      <ul>
                        <li v-for="comment in article.get_comments" :key="comment.id" class="my-5">
                          <div v-if="!comment.parent_id">
                            <div class="author-thumb">
                            <img :src="comment.user.image" alt="">
                            </div>
                            <div class="right-content">
                                <h4>{{comment.user.first_name}} {{comment.user.last_name}}<span>{{comment.created_at}}</span></h4>
                                <p>{{comment.comment}}</p>
                            </div>
                          </div>
                          <div class="sub-container propery-container" v-for="subComment in article.get_comments" :key="subComment.id">
                                <div v-if="subComment.parent_id == comment.id" style="margin-left:5rem;margin-top:4rem">
                                    <div class="author-thumb">
                                        <img :src="subComment.user.image" alt="">
                                    </div>
                                    <div class="right-content">
                                    <h4>{{subComment.user.first_name}} {{subComment.user.last_name}}<span>{{subComment.created_at}}</span></h4>
                                        <p>{{subComment.comment}}</p>
                                    </div>
                                </div>
                          </div>
                          
                        </li>
                       
                      
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="sidebar-item submit-comment">
                    <div class="sidebar-heading">
                      <h2>Your comment</h2>
                    </div>
                    <div class="content">
                      <form id="comment" action="#" method="post">
                        <div class="row">
                          <div class="col-md-6 col-sm-12">
                            <fieldset>
                              <input name="name" type="text" id="name" placeholder="Your name" required="">
                            </fieldset>
                          </div>
                          <div class="col-md-6 col-sm-12">
                            <fieldset>
                              <input name="email" type="text" id="email" placeholder="Your email" required="">
                            </fieldset>
                          </div>
                          <div class="col-md-12 col-sm-12">
                            <fieldset>
                              <input name="subject" type="text" id="subject" placeholder="Subject">
                            </fieldset>
                          </div>
                          <div class="col-lg-12">
                            <fieldset>
                              <textarea name="message" rows="6" id="message" placeholder="Type your comment" required=""></textarea>
                            </fieldset>
                          </div>
                          <div class="col-lg-12">
                            <fieldset>
                              <button type="submit" id="form-submit" class="main-button">Submit</button>
                            </fieldset>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="sidebar">
              <div class="row">
                <div class="col-lg-12">
                  <div class="sidebar-item search">
                    <form id="search_form" name="gs" method="GET" action="#">
                      <input type="text" name="q" class="searchText" placeholder="type to search..." autocomplete="on">
                    </form>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="sidebar-item recent-posts">
                    <div class="sidebar-heading">
                      <h2>Recent Posts</h2>
                    </div>
                    <div class="content">
                      <ul>
                        <li><a href="post-details.html">
                          <h5>Vestibulum id turpis porttitor sapien facilisis scelerisque</h5>
                          <span>May 31, 2020</span>
                        </a></li>
                        <li><a href="post-details.html">
                          <h5>Suspendisse et metus nec libero ultrices varius eget in risus</h5>
                          <span>May 28, 2020</span>
                        </a></li>
                        <li><a href="post-details.html">
                          <h5>Swag hella echo park leggings, shaman cornhole ethical coloring</h5>
                          <span>May 14, 2020</span>
                        </a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="sidebar-item categories">
                    <div class="sidebar-heading">
                      <h2>Categories</h2>
                    </div>
                    <div class="content">
                      <ul>
                        <li><a href="#">- Nature Lifestyle</a></li>
                        <li><a href="#">- Awesome Layouts</a></li>
                        <li><a href="#">- Creative Ideas</a></li>
                        <li><a href="#">- Responsive Templates</a></li>
                        <li><a href="#">- HTML5 / CSS3 Templates</a></li>
                        <li><a href="#">- Creative &amp; Unique</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="sidebar-item tags">
                    <div class="sidebar-heading">
                      <h2>Tag Clouds</h2>
                    </div>
                    <div class="content">
                      <ul>
                        <li><a href="#">Lifestyle</a></li>
                        <li><a href="#">Creative</a></li>
                        <li><a href="#">HTML5</a></li>
                        <li><a href="#">Inspiration</a></li>
                        <li><a href="#">Motivation</a></li>
                        <li><a href="#">PSD</a></li>
                        <li><a href="#">Responsive</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import { onMounted, ref } from 'vue'
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
    .comments img{
        width: 70px;
        height: 70px;
        border-radius: 5px;
    }
</style>