<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="heima" />
        <h1>黑马后台管理系统</h1>
      </div>
      <el-button type="info" @click="logout">logout</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="(isCollapse ? 64: 201) +'px'">
        <div class="toggle-button" @click="isCollapse = !isCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          router
          unique-opened
          :collapse="isCollapse"
          :default-active="$route.path"
        >
          <el-submenu
            v-for="(menu, mIndex) in menus"
            :key="mIndex"
            :index="menu.id + ''"
          >
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>{{ menu.authName }}</span>
            </template>
            <el-menu-item
              v-for="sub in menu.children"
              :key="sub.path"
              :index="'/' + sub.path"
            >
              <i class="el-icon-menu"></i>
              <span>{{ sub.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      // 菜单项折叠状态
      isCollapse: false,
      // 菜单列表
      menus: [],
    }
  },
  created() {
    window.home = this
    this.getMenus()
  },
  methods: {
    // 获取菜单列表
    getMenus() {
      this.$http.get('/menus').then((res) => {
        console.log(res)
        this.menus = res.data
      })
    },
    logout() {
      // 删除token
      window.sessionStorage.removeItem('token')
      // 跳转到登录页面
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;

    h1 {
      margin: 0;
      margin-left: 15px;
      color: #fff;
    }
  }
}

.el-aside {
  transition: width 0.3s;
  background-color: #333744;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.el-menu {
  border-right: none;
}

.el-main {
  background-color: #eaedf1;
}
</style>
