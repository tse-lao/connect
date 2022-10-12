<script lang="ts">
import AccountDetails from "@/components/Account/AccountDetails.vue";
import ProfilePicture from "@/components/Account/ProfilePicture.vue";
import { mapState } from "vuex";
export default {
  components:{ AccountDetails, ProfilePicture },
  data(){
    return (
      {viewAccount: false,}
    )
    
  },
  methods: {
    login() {
      if (window.ethereum) {
        this.$store.dispatch("account/loginAccount");
        //we call the child component to rerender; 
        this.$refs.profilePic.makeIcon(this.accounts.address);
      }
    },
    detailsShow() {
      this.viewAccount = !this.viewAccount;
    }
  },
  computed: mapState({
    accounts: (state) => state.account
  }),
};
</script>

<template>
  <div class="app">
    <div id="leftSide">
      <div id="nav">
        <div id="logo">
          <img src="@/assets/images/logo.png" class="nav-item-icon" />
        </div>
        
        <div class="nav-item" to="/" @click="$router.push('/')">
          <img
            src="@/assets/icons/dashboard.svg"
            class="nav-item-icon"
          />
          <router-link to="/"> Home</router-link>
        </div>
        
        <div class="nav-item" @click="$router.push('/contracts')">
          <img
            class="nav-item-icon"
            src="@/assets/icons/file-1.svg"
            alt="Dashboard"
          />
          <router-link to="/contracts">Contracts</router-link>
        </div>
        <div class="nav-item" @click="$router.push('/files')">
          <img
            class="nav-item-icon"
            src="./assets/icons/files.svg"
            alt="Files"
          />
          <router-link to="/files">Files</router-link>
        </div>
        <div class="nav-item" @click="$router.push('/settings')">
          <img
            class="nav-item-icon"
            src="./assets/icons/cog.svg"
            alt="Dashboard"
          />
          <router-link to="/settings">Settings</router-link>
        </div>
        
        <div class="profile-icon" @click="login">
          <ProfilePicture ref="profilePic" :address="accounts.address" />
        </div>
        <div class="nav-item">
          {{accounts.balance}} 
          <span>tokens</span>
        </div>
        <AccountDetails v-if="viewAccount"/>
      </div>
    </div>
    <div id="content">
      <RouterView />
    </div>
  
  </div>
</template>
<style scoped>
:root {
  text-align: center;
  color: white;
}

body {
  background-color: #18141d;
  margin: 0;
  color: #c2c2c2;
  font-family: monospace;
  /*  font-family: "Nunito", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif; */
}
.app{
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.profile-pic {
  height: 64px;
  position: fixed;
  width: 64px;
  border-radius: 50%;
  border: 1px solid #000;
}
.profile-pic:hover {
  opacity: 0.5;
}
.profile-icon{
  margin: auto;
  padding: 8px;
}
.profile-icon:hover{
  opacity: 0.5;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.4)
}
.formkit-input {
  color: white !important;
}
#leftSide {
  width: 100px;
  height: 100vh;
  background-color: #21212a;
  margin: 0;
  position: fixed;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
#logo img {
  filter: invert(0);
  width: 32px;
  height: 32px;
  opacity: 100%;
}
#logo {
  display: block;
  width: 50%;
  height: 50%;
  margin: auto;
  padding: 10% 0 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;

  margin-bottom: 24px;
  margin-top: 24px;
}
#nav {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
}
.nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #cacacc;
  font-weight: 600;
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 12px;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
}
.nav-item:hover {
  filter: brightness(0) invert(1);
  cursor: pointer;
  border-right: solid 1px #fff;
}
.nav-item:hover a {
  color: #fff !important;
}

.nav-item a {
  color: #cacacc;
  text-decoration: none;
}
.nav-item-icon {
  width: 24px;
  height: 24px;
  padding: 10px;
  fill: #f4f9ff;
  color: #f4f9ff;
  filter: brightness(3) invert(1);
}

.bottom-settings {
  bottom: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid #cacacc;
  gap: 12px;
  margin: 20px;
  padding: 8px 4px;
  border-radius: 6px;
  align-items: center;
}

#content {
  padding: 12px;
  margin-left: 100px;
  width: calc(100vw - 150px);
  max-width: 1200px;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

@media(max-width: 700px ){
  .app{
    flex-direction: column;
  }
}
</style>
