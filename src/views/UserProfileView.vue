<!-- 用户动态 -->
<template>
    <ContentBase>
      <!-- 定义bootstrap 布局gird -->
        <div class="row">
          <div class="col-3">
            <!-- 绑定属性:user="user"传递父组件传递子组件信息  子组件向父组件触发事件需要绑定@ -->
            <UserProfileInfo @follow="follow" @unfollow="unfollow" :user="user"></UserProfileInfo>
            <UserProfileWrite v-if="is_me" @post_a_post="post_a_post"></UserProfileWrite>
          </div> 
          <div class="col-9">
            <UserProfilePosts :user="user" :posts="posts" @delete_a_post="delete_a_post"></UserProfilePosts>
          </div>
        </div>
    </ContentBase>
</template>
  
  <script>
import ContentBase from '@/components/ContentBase.vue';
import UserProfileInfo from '@/components/UserProfileInfo.vue';
import UserProfilePosts from '@/components/UserProfilePosts.vue';
import UserProfileWrite from '@/components/UserProfileWrite.vue';
import $ from 'jquery';
import {  computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

  
  export default {
    name: 'UserProfileView',
    components: {
        // 在template会用到哪些组件就放入
        ContentBase, 
        UserProfileInfo, 
        UserProfilePosts,
        UserProfileWrite,
    },

    // 一般有数据在最顶层组件
    // setup入口
    setup() {
      const store = useStore();
      // 访问user对象
      const route = useRoute();
      // route.params.userId  userId与路由对应
      const userId = parseInt(route.params.userId);
      // 当前组件用户是不变的 reactive只能接受对象
      const user = reactive({
        // id: 1,
        // username: "guanzihao",
        // lastName: "guan",
        // firstName: "zihao",
        // // 定义粉丝数
        // followerCount: 520,
        // // 是否关注
        // is_followed: false,
      });
      // 定义帖子列表
      const posts = reactive({
        // // 定义数量
        // count: 3,
        // posts: [
        //   {
        //     id: 1,
        //     userId: 1,
        //     content: "今天上了Web课开心了",
        //   },
        //   {
        //     id: 2,
        //     userId: 1,
        //     content: "今天上了算法课更开心了",
        //   },
        //   {
        //     id: 3,
        //     userId: 1,
        //     content: "今天上了不上课开心飞了",
        //   },
        // ]
      });
      
      $.ajax({
        url: 'https://app165.acapp.acwing.com.cn/myspace/getinfo/',
        type: "GET",
        data: {
          user_id: userId,
        },
        headers: {
          // 授权             Bearer后有空格
          'Authorization': "Bearer " + store.state.user.access,
        },
          success: function (resp) {
            user.id = resp.id;
            user.username = resp.username;
            user.photo = resp.photo;
            // 定义粉丝数
            user.followerCount= resp.followerCount;
            // 是否关注
            user.is_followed =resp.is_followed;
          }
        });

        $.ajax({
          url: 'https://app165.acapp.acwing.com.cn/myspace/post/',
          type: 'GET',
          data: {
            user_id: userId,
          },
          headers: {
          // 授权             Bearer后有空格
          'Authorization': "Bearer " + store.state.user.access,
          },
          success: function(resp) {
            posts.count = resp.length;
            posts.posts = resp;
          }
        });

      // 发帖 子组件联系父组件事件
      const post_a_post = (content) => {
         posts.count ++ ;
        //  unshift最前面添加
         posts.posts.unshift({
            id: posts.count,
            userId: 1,
            content: content,
         })
      }

      const delete_a_post = (post_id) => {
        posts.posts = posts.posts.filter(post => post.id !== post_id);
        posts.count = posts.posts.length;
      }

      const follow = () => {
        if (user.is_followed) return;
        user.is_followed = true;
        user.followerCount ++ ;
      }

      const unfollow = () => {
        if (!user.is_followed) return;
        user.is_followed = false;
        user.followerCount -- ;
      }

      // 计算该页面是否是本人
      const is_me = computed(() => userId === store.state.user.id)

      // 需要return出去
      return {
        user, follow, unfollow, posts, post_a_post, userId, is_me, delete_a_post
      }
    }
  }
  </script>
  
  <style scoped>

  </style>
  