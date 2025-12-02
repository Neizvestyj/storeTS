import { createRouter, createWebHistory } from 'vue-router'

//import Login from './navbar/Login.vue'
//import Cart from './navbar/Cart.vue'
//import Promo from './Promo.vue'

const Login = () => import('./navbar/login.vue');
const Cart = () => import('./navbar/cart.vue');
const Promo = () => import('./promo.vue');
const PromoMini = () => import('./Catalog/PromoMini.vue');
const promoProduct = () => import('./Product/promoProduct.vue');
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/promo' },
        { path: '/promo', component: Promo },
        { path: '/login', component: Login },
        { path: '/cart', component: Cart },
        { path: '/PromoMini', component: PromoMini },
        { path: '/promoProduct', component: promoProduct },

    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    scrollBehavior(to, from, savedPosition) {
        console.log('scrollBehavior called');
        return { left: 0, top: 0 }; // Устанавливаем прокрутку на верх страницы
    },

})

router.beforeEach((to, from, next) => {
    console.log('beforeEach')
    if (to.meta.cantEnter) {
        next({ name: 'home' })
    } else {
        next()
    }
})

router.afterEach((to, from) => {

})

export default router