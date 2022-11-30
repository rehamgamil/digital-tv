<template>
  <div class="main-navbar">
    <b-navbar class="navbar-dark" toggleable="lg" variant="primary">
      <b-container>
        <!-- <div class="navbar-start">
          <b-navbar-brand :to="{ name: 'Home' }">
            <img src="../assets/images/logo.png" alt="" />
          </b-navbar-brand>
        </div> -->
        <div class="navbar-start">
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item :to="{ name: 'Home' }">
                Home
              </b-nav-item>
              <b-nav-item >
                Live
              </b-nav-item>
              <b-nav-item :to="{ name: 'AboutUs' }">{{
                $t('aboutUs.moduleName')
              }}</b-nav-item>
              <b-nav-item :to="{ name: 'Contacts' }">{{
                $t('contacts.moduleName')
              }}</b-nav-item>
            </b-navbar-nav>
            <b-nav-form>
          <b-form-input size="lg" class="search-navbar  " placeholder="Search">
          
          </b-form-input>
          
          
        </b-nav-form>
      
    
           
          </b-collapse>
          
        </div>
        
        <div>
          
          <b-navbar-nav class="ml-auto navbar-login">
            
              <b-nav-item-dropdown class="dropdown-lang">
                
                <template #button-content>
                  <i class="fas fa-language" />
                </template>
                <b-dropdown-item
                  v-for="(lang, i) in LANGUAGES"
                  :key="`Lang${i}`"
                  @click="changeLanguage(lang)"
                >
                  <img class="dropdown-icon" :src="lang.image" alt="" />
                  <span class="">{{ lang.title }}</span>
                </b-dropdown-item>
              </b-nav-item-dropdown>

              <b-nav-item-dropdown>
                <template #button-content>
                  <span class="p-2 login">Login</span>
                  <i class="fas fa-user-circle user"></i>
                 
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
              </b-nav-item-dropdown>
            </b-navbar-nav>
        </div>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { LANGUAGES } from '../config/constant'
import { getLanguage, changeLanguage } from '../utils/helper'
import authService from '@/pages/auth/auth.service'

export default {
  name: 'MainNavbar',
  computed: {
    ...mapGetters({
      authorizationToken: 'auth/authorizationToken',
      userData: 'auth/userData',
    }),
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
  nav.navbar {
    height: 100%;
    .container {
      display: flex;
      // justify-content: space-between;
    }
    @media (max-width: #{$max-width-labtop}) {
      .navbar-collapse {
        background-color: #222222d1;
        width: 100%;
        padding: 1rem;
        position: absolute;
        left: 0;
        right: 0;
        margin-top: 1rem;
        z-index: 10;
      }
    }

    .navbar-icon {
      width: 40px;
      img {
        width: 40px;
      }
    }
    i {
      font-size: 1.5rem;
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
  }
}
.search-navbar{
  border-radius: 25px;
  width: 600px;
  margin-inline-start: 40px;
  margin-inline-end: 40px;
  
}
.navbar-login{
  display: flex;
  align-items: center;
  .login{
  
  align-items: center;
}
}


</style>
