<template>
  <div class="main-navbar">
    <div class="navbar-header p-3">
      <b-container>
        <b-dropdown>
          <template #button-content>
            <!-- <i class="fas fa-user-circle"></i> -->
             <img src="@/assets/images/user/user.svg" alt="" /> 
            <span v-if="authorizationToken">{{
              $t('profile.moduleName')
            }}</span>
            <span v-else>{{ $t('auth.signIn') }}</span>
          </template>
          <template v-if="authorizationToken">
            <b-dropdown-item :to="{ name: 'profile.MyMembership' }">{{
              $t('profile.moduleName')
            }}</b-dropdown-item>

            <b-dropdown-item @click="logout()">
              {{ $t('auth.logout') }}
            </b-dropdown-item>
          </template>
          <template v-else>
            <b-dropdown-item :to="{ name: 'auth.SignIn' }">{{
              $t('auth.signIn')
            }}</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'auth.SignUp' }">{{
              $t('auth.signUp')
            }}</b-dropdown-item>
          </template>
        </b-dropdown>

        <b-dropdown class="dropdown-lang">
          <template #button-content>
            <!-- <i class="fas fa-language" /> -->
             <img src="@/assets/images/lang/language.svg" alt="" /> 
            <span>{{ $t(`languages.${currentLanguage.value}`) }}</span>
          </template>
          <b-dropdown-item
            v-for="(lang, i) in LANGUAGES"
            :key="`Lang${i}`"
            @click="changeLanguage(lang)"
          >
            <!-- <img class="dropdown-icon" :src="lang.image" alt="" /> -->
            <!-- <span>{{ lang.title }}</span> -->
            <span>{{ $t(`languages.${lang.value}`) }}</span>
          </b-dropdown-item>
        </b-dropdown>
      </b-container>
    </div>

    <b-navbar toggleable="lg">
      <b-container>
        <div class="navbar-start">
          <b-navbar-brand :to="{ name: 'Home' }">
           
            <img :src="logo" alt="" /> 
            
          </b-navbar-brand>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item :to="{ name: 'Home' }">Home</b-nav-item>
              
              <b-nav-item :to="{ name: 'AboutUs' }">{{
                $t('aboutUs.moduleName')
              }}</b-nav-item>
              <b-nav-item :to="{ name: 'Home' }">Live</b-nav-item>
              <b-nav-item :to="{ name: 'Contacts' }">{{
                $t('contacts.moduleName')
              }}</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </div>
        <div class="navbar-end">
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <!-- <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item :to="{ name: 'AboutUs' }">{{
                $t('aboutUs.moduleName')
              }}</b-nav-item>
              <b-nav-item :to="{ name: 'Contacts' }">{{
                $t('contacts.moduleName')
              }}</b-nav-item>
            </b-navbar-nav>
          </b-collapse> -->
        </div>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { LANGUAGES } from '@/config/constant'
import { getLanguage, changeLanguage } from '@/utils/helper'
import authService from '@/pages/auth/auth.service'
 import logoEn from '@/assets/images/logo-en.png'
 import logoAr from '@/assets/images/logo-ar.png'

export default {
  name: 'MainNavbar',
  computed: {
    ...mapGetters({
      authorizationToken: 'auth/authorizationToken',
      userData: 'auth/userData',
    }),
    logo() {
      return this.currentLanguage.value == 'ar' ? logoAr : logoEn
    },
  },
  data() {
    return {
      LANGUAGES,
      currentLanguage: getLanguage(),
    }
  },
  methods: {
    ...mapActions({
      logoutFromStore: 'auth/logout',
    }),
    changeLanguage,
    logout() {
      authService.logout()
      this.logoutFromStore()
      this.$router.push({ name: 'auth.SignIn' })
    },
  },
}
</script>
<style lang="scss">
@import '@/assets/styles/_variables.scss';

.main-navbar {
  height: var(--navbar-height);
  .navbar-header {
    height: var(--navbar-header-height);
    background-color: var(--co-primary);
    color: var(--co-primary-text);

    .container {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      column-gap: 1rem;
      // padding-inline: 1rem;
      .dropdown-toggle {
        padding: 0;
        margin: 0;
        border: initial;
        background: initial;
        display: flex;
        align-items: center;
        .btn-content {
          display: inline-flex;
          align-items: center;
          column-gap: 5px;
          img {
            width: 24px;
          }
        }
      }
      .dropdown-menu li button,
      .dropdown-menu li a {
        font-weight: bold;
        font-size: 0.875rem;
      }
    }
  }
  nav.navbar {
    height: var(--navbar-content-height);
    background: #fff;
    .container-fluid {
      .container {
        display: flex;
        justify-content: space-between;
        height: 100%;
        align-items: center;
        .navbar-start {
          display: flex;
          .navbar-brand img {
            width: 8rem;
          }
          .nav-item {
            // border-inline-end: 2px solid var(--co-primary);
            position: relative;
            padding-inline: 1.25rem;
            &:not(:last-child) {
              &::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 100%;
                right: auto;
                transform: translateY(-50%);
                width: 1px;
                height: 12px;
                background-color: var(--co-primary);
              }
            }
            a {
              // font-weight: bold;
              font-size: 0.875rem;
              color: var(--co-primary);
              padding: 0;
            }
          }
        }
      }
    }
    @media (max-width: #{$max-width-labtop}) {
      .navbar-collapse {
        background-color: #e8e8e8dd;
        width: 100%;
        padding: 1rem;
        position: absolute;
        left: 0;
        right: 0;
        margin-top: 4rem;
        z-index: 10;
        .nav-item {
          // border-inline-end: initial !important;
          &::before {
            display: none;
          }
          a {
            text-align: center;
          }
        }
      }
    }

    .navbar-icon {
      width: 40px;
      img {
        width: 40px;
      }
    }
  }
  .dropdown-lang {
    .dropdown-menu button {
      display: flex;
      column-gap: 10px;
      align-items: center;
    }
  }
  .dropdown-icon {
    width: 32px;
  }
  i {
    font-size: 1.5rem;
  }
}
html[lang='ar']
  .main-navbar
  nav.navbar
  .container-fluid
  .container
  .navbar-start
  .nav-item:not(:last-child)::before {
  left: auto;
  right: 100%;
}
</style>