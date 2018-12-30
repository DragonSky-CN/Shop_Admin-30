<template>
  <el-container class="home">
    <el-header>
      <div class="logo"></div>
      <div class="title"><h1>电商后台管理系统</h1></div>
      <div class="logout">
        <span>欢迎光临</span>
        <a href="javascript:;" @click="logout">退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!--
          el-menu：导航菜单组件
          default-active：默认选中激活的菜单
          background-color：导航菜单的背景颜色
          text-color：导航菜单的文字颜色
          active-text-color：选中激活菜单的颜色
          unique-opened：是否只保持一个子菜单的展开

          el-submenu：子菜单
            template：显示子菜单的内容
            el-menu-item-group：菜单项的分组
        -->
        <el-menu
          default-active="1-1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened>
          <!-- 用户管理 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 权限管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>
              <span slot="title">角色列表</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>
              <span slot="title">权限列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 商品管理 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
          </el-submenu>
          <!-- 订单管理 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>
          </el-submenu>
          <!-- 数据统计 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-menu"></i>
              <span slot="title">数据统计</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout() {
      // 弹出确认框
      this.$confirm('您确定要退出本系统么？', '系统提示', {
        type: 'warning'
      }).then(() => {
        // 点击确认键
        // 移除 token
        localStorage.removeItem('token')
        this.$router.push('/login')
        this.$message.success('已成功退出系统！')
      }).catch(() => {
        // 点击取消键
        this.$message.info('取消退出操作！')
      })
    }
  }
}
</script>

<style lang="less" scoped>
// scoped 的作用：样式只会在当前组件生效
// 注意：在 less 中，如果想要使用 @ 的别名，前面加上波浪线 ~
.home {
  height: 100%;
  .el-header {
    background-color: #B3C1CD;
    display: flex;
    .logo {
      width: 180px;
      // background-image: url('../assets/logo.png');
      background-image: url('~@/assets/logo.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
    }
    .title {
      flex: 1;
      h1 {
        line-height: 60px;
        font-size: 30px;
        text-align: center;
        color: #ffffff;
      }
    }
    .logout {
      width: 180px;
      // 解决与浏览器滚动栏冲突导致抖动问题【测试环境：FireFox 64.0】
      padding-right: calc(100vw - 100%);
      line-height: 60px;
      text-align: right;
      font-weight: 700;
      a {
        color: orange;
      }
    }
  }
  .el-aside {
    background-color: #545C64;
    // 修补导航子菜单宽度计算误差问题
    .el-submenu {
      width: 200px;
    }
  }
  .el-main {
    background-color: #D4DFE4;
  }
}
</style>
