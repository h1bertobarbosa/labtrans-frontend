import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import LoginForm from './components/LoginForm.vue'
import RegisterUser from './components/RegisterUser.vue'
import ListarReservas from './components/ListarReservas.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/registrar/usuario',
      name: 'registrar_usuario',
      component: RegisterUser
    },
    {
      path: '/login',
      name: 'login',
      component: LoginForm
    },
    {
      path: '/reservas',
      name: 'reservas',
      component: ListarReservas
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/registrar/usuario']
  const authRequired = !publicPages.includes(to.path)
  const login = JSON.parse(sessionStorage.getItem('login'))

  if (authRequired && !login) {
    return next('/login')
  }

  next()
})

export default router
