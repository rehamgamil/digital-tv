<template>
  <div class="main-navbar">
    <b-navbar class="navbar" toggleable="lg" variant="">
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
                Home |
              </b-nav-item>
              <b-nav-item >
                Live |
              </b-nav-item>
              <b-nav-item :to="{ name: 'AboutUs' }">{{
                $t('aboutUs.moduleName') 
              }} |</b-nav-item>
              <b-nav-item :to="{ name: 'Contacts' }">{{
                $t('contacts.moduleName')
              }}</b-nav-item>
            </b-navbar-nav>
            <b-nav-form>
        
          
        </b-nav-form>
      
    
           
          </b-collapse>
          
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
    height: 70%;
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
