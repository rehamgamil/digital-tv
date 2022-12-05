import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import ImgHomeBanner from '@/assets/images/bannerpage.jpg'

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
//const VerifyOTP = () => import('../pages/auth/VerifyOTP.vue')
const ForgetPassword = () => import('../pages/auth/ForgetPassword.vue')
const SetNewPassword = () => import('../pages/auth/SetNewPassword.vue')
const ActiveNewClient = () => import('../pages/auth/ActiveNewClient.vue')
//#endregion Auth

//#region MyProfile
const MyProfile = () => import('../pages/profile/MyProfile.vue')
const MyMembership = () =>
  import('../pages/profile/myMembership/MyMembership.vue')
const Information = () => import('../pages/profile/information/Information.vue')

const myList = () => import('../pages/profile/myList/myList.vue')
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
        meta: { title: 'memberships.item', bannerImg: ImgHomeBanner },
      },
      {
        path: 'order-summary/:id?',
        name: 'OrderSummary',
        component: OrderSummary,
        meta: { title: 'memberships.orderSummary', auth: false },
        props: true,
      },
      {
        path: 'add-member',
        name: 'addMember',
        component: addMember,
        meta: { title: 'addMember.addMemberInformation', auth: false },
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
        meta: { notAuth: true , footerStatus: false },
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
            meta: { title: 'auth.signUp' },
          },
          {
            path: 'active-new-client',
            name: 'auth.ActiveNewClient',
            component: ActiveNewClient,
            meta: { title: 'auth.activeNewClient' },
          },
          {
            path: 'forget-password',
            name: 'auth.ForgetPassword',
            component: ForgetPassword,
            meta: { title: 'auth.forgetPassword' },
          },
          // {
          //   path: 'reset-password-otp',
          //   name: 'auth.ResetPasswordOTP',
          //   component: VerifyOTP,
          //   meta: { title: 'auth.otp', target: 'ResetPasswordOTP' },
          // },
          {
            path: 'set-new-password',
            name: 'auth.SetNewPassword',
            component: SetNewPassword,
            meta: { title: 'auth.setNewPassword' },
          },
        ],
      },
      {
        path: '/my-profile',
        component: MyProfile,
        meta: { title: 'profile.moduleName', auth: false },
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
            path: 'mylist',
            name: 'profile.myList',
            component: myList,
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
