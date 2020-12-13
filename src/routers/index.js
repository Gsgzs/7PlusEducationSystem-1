import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress"; //引入进度条
import "nprogress/nprogress.css"; //引入进度条样式
import Login from "@/views/Login";
import Home from "@/views/Home";
// NProgress配置
NProgress.configure({ showSpinner: false }); //禁用进度环

const routes = [
  // 默认重定向到登录页
  {
    path: "/",
    redirect: "/login",
  },
  // 登录页
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  // 404
  {
    path: "/404",
    component: () => import(/* webpackChunkName: "404" */ "@/views/404"),
    hidden: true,
  },
  // 主页
  {
    path: "/home",
    name: "Home",
    component: Home,
    // 主体
    children: [
      // 默认重定向首页主体
      {
        path: "/home",
        redirect: "/home/main",
      },
      //#region 首页主体
      {
        path: "/home/main",
        name: "HomeMain",
        component: () => import(/* webpackChunkName: "HomeMain" */ "@/views/HomeMain"),
      },
      //#endregion
      //#region 用户管理
      // 用户列表
      {
        path: "/user/user-list",
        component: () => import(/* webpackChunkName: "UserManage_UserList" */ "@/views/UserManage/UserList"),
      },
      // 用户详情
      {
        path: "/user/details/:id",
        component: () => import(/* webpackChunkName: "UserManage_UserDetails" */ "@/views/UserManage/UserDetails"),
        props: true,
      },
      //#endregion
      //#region 词库管理
      // 词库分类
      {
        path: "/word/category",
        component: () => import(/* webpackChunkName: "Word_WordCategory" */ "@/views/Word/WordCategory"),
      },
      //#endregion
      //#region 题库管理
      // 标签管理
      {
        path: "/question/label",
        component: () => import(/* webpackChunkName: "Question_QuestionLabel" */ "@/views/Question/QuestionLabel"),
      },
      // 听力题库
      {
        path: "/question/listening",
        component: () => import(/* webpackChunkName: "Question_Listening" */ "@/views/Question/Listening"),
      },
      // 口语题库
      {
        path: "/question/speaking",
        component: () => import(/* webpackChunkName: "Question_Speaking" */ "@/views/Question/Speaking"),
      },
      //#endregion
      //#region 柒加圈
      //柒加圈发布列表
      {
        path: "/topic/page",
        name: "TopicPage",
        component: () => import(/* webpackChunkName: "SevenPlusCircle" */ "@/views/SevenPlusCircle")
      },
      //柒加圈发布详情
      {
        path: "/topic/article/:id",
        name: "TopicArticle",
        component: () => import(/* webpackChunkName: "SevenPlusCircle_ArticleDetails" */ "@/views/SevenPlusCircle/ArticleDetails")
      },
      //#endregion
      //#region 用户提交
      //反馈列表
      {
        path: "/sub/feedback",
        name: "SubFeedback",
        component: () => import(/* webpackChunkName: "Sub_SubFeedback" */ "@/views/Sub/SubFeedback"),
      },
      //联系记录
      {
        path: "/sub/contact",
        name: "SubContact",
        component: () => import(/* webpackChunkName: "Sub_SubContact" */ "@/views/Sub/SubContact"),
      },
      //#endregion
      //#region 平台管理
      // 公告
      {
        path: "/platform/notice",
        component: () => import(/* webpackChunkName: "PlatFormManage" */ "@/views/PlatFormManage"),
      },
      //#endregion
      //#region 运营管理
      {
        // 参数管理
        path: "/operation/param",
        component: () => import(/* webpackChunkName: "Operation_Parameter" */ "@/views/Operation/Parameter"),
      },
      {
        // 师咨信息
        path: "/operation/teacher",
        component: () => import(/* webpackChunkName: "Operation_TeacherInfo" */ "@/views/Operation/TeacherInfo"),
      },
      {
        // 课程服务
        path: "/operation/course",
        component: () => import(/* webpackChunkName: "Operation_Course" */ "@/views/Operation/Course"),
      },
      {
        // 互动练习
        path: "/operation/exercise",
        component: () => import(/* webpackChunkName: "Operation_Exercise" */ "@/views/Operation/Exercise"),
      },
      // 备考指南
      {

        // 文章列表
        path: "/operation/article",
        component: () => import(/* webpackChunkName: "Operation_Article" */ "@/views/Operation/Article")
      },
      {
        // 关于PTE
        path: "/operation/about",
        component: () => import(/* webpackChunkName: "Operation_AboutPTE" */ "@/views/Operation/AboutPTE")
      },
      {
        // 常见问题
        path: "/operation/problem",
        component: () => import(/* webpackChunkName: "Operation_Problem" */ "@/views/Operation/Problem")
      },

      {
        path: "/operation/guide",
        component: () => import(/* webpackChunkName: "Operation_Guide" */ "@/views/Operation/Guide"),

      },
      //#endregion
      //#region 权限管理
      //权限组
      {
        path: "/sys/role",
        name: "SysRole",
        component: () => import(/* webpackChunkName: "Sys_SysRole" */ "@/views/Sys/SysRole"),
      },
      //权限组添加
      {
        path: "/sys/role/add",
        name: "SysRoleAdd",
        component: () => import(/* webpackChunkName: "Sys_SysRoleAdd" */ "@/views/Sys/SysRoleAdd"),
      },
      //权限组编辑
      {
        path: "/sys/role/edit/:id",
        name: "SysRoleEdit",
        component: () => import(/* webpackChunkName: "Sys_SysRoleEdit" */ "@/views/Sys/SysRoleEdit"),
      },
      //账号管理
      {
        path: "/sys/user",
        name: "SysUser",
        component: () => import(/* webpackChunkName: "Sys_SysUser" */ "@/views/Sys/SysUser"),
      },
      //操作日志
      {
        path: "/sys/log",
        name: "SysLog",
        component: () => import(/* webpackChunkName: "Sys_SysLog" */ "@/views/Sys/SysLog"),
      },
      //#endregion
    ],
  },
  // The 404 page must be placed at the end
  { path: "/:catchAll(.*)", redirect: "/404", hidden: true },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 添加路由前置守卫
// to：代表要去那个路由
// from：代表来自哪个路由
// next：下一步去哪里，next()代表放行，如果next("/login")代表强制跳转到到login路由
router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start();
  // 获取token
  let isAuthenticated = window.sessionStorage.getItem("token");
  // 1. 去登录页时不拦截   2. 检测是否获取token经过校验
  // 不是去登录页，且没有经过校验 跳转至登录页面
  if (to.name !== "Login" && !isAuthenticated) {
    // 强制转到login
    next({
      name: "Login",
    });
  } else {
    next(); // 否则放行
  }
});

router.afterEach(() => {
  // 终止进度条
  NProgress.done();
});

export default router;
