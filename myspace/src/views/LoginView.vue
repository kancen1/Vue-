<template>
    <ContentBase>
      <div class="row justify-content-md-center">
        <div class="col-3">
          <!-- 绑定事件 -->
          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="username" class="form-label">用户名</label>
              <!-- v-model双向绑定 -->
              <input v-model="username" type="text" class="form-control" id="username">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">密码</label>
              <input v-model="password" type="password" class="form-control" id="password">
            </div>
              <div class="error-message">{{ error_message }}</div>
              <button type="submit" class="btn btn-primary">登录</button>
          </form>
        </div>
      </div>
    </ContentBase>
</template>
  
  <script>
import ContentBase from '@/components/ContentBase.vue';
import router from '@/router';
import { ref } from 'vue';
import { useStore } from 'vuex';

  
  export default {
    name: 'LoginView',
    components: {
        ContentBase,
      // 在template会用到哪些组件就放入
    },
    setup() {
      // useStore获取全局
      const store = useStore();
      let username = ref('');
      let password = ref('');
      let error_message = ref('');

      const login = () => {
        // 调用store中actions
        // 将函数名传入  给store传出输入信息 调用actions用这个
        store.dispatch("login", {
          username: username.value,
          password: password.value,
          success() {
            // 成功的话跳转
            error_message.value = "";
            router.push({name: 'userlist'})
          },

          error() {
            // 失败的话 
            error_message.value = "用户名或密码错误";
          }, 
        });
      };

      return {
        username, 
        password,
        error_message,
        login,
      }
    }
  }
  </script>
  
  <style scoped>

  button {
    width: 100%;
  }

  .error-message {
    color: red;
  }
  </style>
  