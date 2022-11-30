import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

//#region layouts
const MainLayout = () => import('../layouts/MainLayout.vue')
//#endregion layouts

//#region Pages
const ErrorPage = () => import('../pages/error/Error.vue')

const Home = () => import('../pages/home/Home.vue')
const OrderSummary = () => import('../pages/home/OrderSummary.vue')
const addMember = () => import('../pages/members/addMember.vue')

//#region Payment
const Checkout = () => import('../pages/payment/Checkout.vue')
const PaymentStatus = () => import('../pages/payment/PaymentStatus.vue')
//#endregion Payment

//#region Auth
const SignIn = () => import('../pages/auth/SignIn.vue')
const SignUp = () => import('../pages/auth/SignUp.vue')
const ActiveNewClient = () => import('../pages/auth/ActiveNewClient.vue')
//#endregion Auth

//#region MyProfile
const MyProfile = () => import('../pages/profile/MyProfile.vue')
const MyMembership = () =>
  import('../pages/profile/myMembership/MyMembership.vue')
const Information = () => import('../pages/profile/information/Information.vue')
const Purchases = () => import('../pages/profile/purchases/Purchases.vue')
const Family = () => import('../pages/profile/family/Family.vue')
//#endregion MyProfile

const AboutUs = () => import('../pages/aboutUs/AboutUs.vue')
const Contacts = () => import('../pages/contacts/Contacts.vue')
//#endregion Pages

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: { title: 'global.appName', height: '300px' },
      },
      {
        path: 'order-summary/:id?',
        name: 'OrderSummary',
        component: OrderSummary,
        meta: { title: 'memberships.orderSummary', auth: true },
        props: true,
      },
      {
        path: 'add-member',
        name: 'addMember',
        component: addMember,
        meta: { title: 'addMember.addMemberInformation', auth: true },
      },
      {
        path: '/payment',
        meta: { auth: true },
        children: [
          {
            path: 'checkout/:id?',
            name: 'Checkout',
            component: Checkout,
            meta: { title: 'payment.checkout' },
            props: true,
          },
          {
            path: 'payment-status',
            name: 'PaymentStatus',
            component: PaymentStatus,
            meta: { title: 'payment.paymentStatus' },
          },
        ],
      },
      {
        path: '/auth',
        meta: { notAuth: true },
        children: [
          {
            path: 'sign-in',
            name: 'auth.SignIn',
            component: SignIn,
            meta: { title: 'auth.signIn' },
          },
          {
            path: 'sign-up',
            name: 'auth.SignUp',
            component: SignUp,
           
          },
          {
            path: 'active-new-client',
            name: 'auth.ActiveNewClient',
            component: ActiveNewClient,
            meta: { title: 'auth.activeNewClient' },
          },
        ],
      },
      {
        path: '/my-profile',
        component: MyProfile,
        meta: { title: 'profile.moduleName', auth: true },
        children: [
          {
            path: 'my-membership',
            name: 'profile.MyMembership',
            component: MyMembership,
          },
          {
            path: 'information',
            name: 'profile.Information',
            component: Information,
          },
          {
            path: 'purchases',
            name: 'profile.Purchases',
            component: Purchases,
          },
          {
            path: 'family',
            name: 'profile.Family',
            component: Family,
          },
        ],
      },
      {
        path: 'about-us',
        name: 'AboutUs',
        component: AboutUs,
        meta: { title: 'aboutUs.moduleName' },
      },
      {
        path: 'contacts',
        name: 'Contacts',
        component: Contacts,
        meta: { title: 'contacts.moduleName' },
      },
    ],
  },

  {
    path: '/*',
    name: 'errorPage',
    component: ErrorPage,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const authorizationToken = store.getters['auth/authorizationToken']
  if (to.meta.auth) {
    if (!authorizationToken) {
      return next({ name: 'auth.SignIn' })
    } else {
      return next()
    }
  } else if (to.meta.notAuth) {
    if (authorizationToken) {
      return next({ name: 'Home' })
    } else {
      return next()
    }
  }
  next()
})

export default router