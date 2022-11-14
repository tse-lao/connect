<script lang="ts">
import "./assets/main.css";
import AccountDetails from "./components/Account/AccountDetails.vue";
import ProfilePicture from "./components/Account/ProfilePicture.vue";
import { useAccountStore } from "./stores/account.js";

import '@/assets/base.css'



export default {
  name: "App",
  components: { AccountDetails, ProfilePicture },
  data() {
    return (
      {
        viewAccount: false,
        showNav: false,
        big: true,
        correctNetwork: false
      }
    )

  },
  setup() {
    const account = useAccountStore();

    return { account }
  },
  methods: {
    login() {

      this.account.getAccount()
      console.log("account getting.")
      //we call the child component to rerender; 

    },
    detailsShow() {
      this.viewAccount = !this.viewAccount;
    },
    onResize() {
      if (window.innerWidth > 700) {
        this.big = true;
        return
      }
      this.big = false
      return
    },

    async networkCheck() {
      const network = await window.ethereum.networkVersion;
      if (network == 80001) { this.correctNetwork = true }
    },

    async changeNetwork() {
      await this.addChainToMetaMask();

      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [
            { chainId: '0x13881' }
          ]
        })
        this.networkCheck();
      } catch (e) {
        console.log(e)
        this.addChainToMetaMask();
      }
    },

    async addChainToMetaMask() {
      //here we just add it instead of switch it 
      const params = [{
        chainId: '0x13881', // 8001
        chainName: 'Mumbai',
        nativeCurrency: {
          name: 'MATIC Token',
          symbol: 'MATIC',
          decimals: 18,
        },
        rpcUrls: ['https://matic-mumbai.chainstacklabs.com/'],
        blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    }]

      await window.ethereum.request({
        method: 'wallet_addEthereumChain', params
      }).then(() => {console.log('addded succesfully')})
    }
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    }),
      this.login();
  },
  created() {
    window.ethereum.on('accountsChanged', this.login)
    window.ethereum.on('chainChanged', this.login)
    window.ethereum.on('message', (message: any) => {
      console.log(message);
    })
  }
};
</script>

<template>
  <div class="app">
    <div id="leftSide">
      <div class="menu-icon">
        <img v-if="showNav" @click="showNav = !showNav" class="menu-icon" src="@/assets/icons/menu-close.png" />
        <img v-else @click="showNav = !showNav" class='menu-icon' src="@/assets/icons/menu.png" />

      </div>
      <div id="logo">
        <img src="@/assets/images/logo.png" />
      </div>
      <div id="nav" @click="showNav = !showNav" v-if="showNav || big">

        <div class="nav-item" to="/" @click="$router.push('/')">
          <img src="@/assets/icons/dashboard.png" class="nav-item-icon" />
          <router-link to="/"> Home</router-link>
        </div>

        <div class="nav-item" @click="$router.push('/contracts')">
          <img class="nav-item-icon" src="@/assets/icons/smart-contracts.png" alt="Contracts" />
          <router-link to="/contracts">Contracts</router-link>
        </div>
        <div class="nav-item" @click="$router.push('/bounties')">
          <img class="nav-item-icon" src="./assets/icons/bounty.png" alt="Dashboard" />
          <router-link to="/bounties">Bounties</router-link>
        </div>

        <div class="profile-icon" @click="login">
          <ProfilePicture ref="profilePic" :address="account.address" />
        </div>
        <div class="nav-item">
          {{ account.balance }}
          <span>tokens</span>
        </div>
        <AccountDetails v-if="viewAccount" />
      </div>
    </div>
    <div id="content">

      <RouterView v-if="account.network === '0x13881'" />
      <div v-else>
        <button @click="changeNetwork">Change Network</button>
      </div>
    </div>

  </div>
</template>
<style scoped>

body {
  background-color: #18141d;
  margin: 0;
  color: #c2c2c2;
  font-family: monospace;
  background: #18141d !important;
  /*  font-family: "Nunito", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif; */
}

.app {
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

.menu-icon {
  display: none;
}

.profile-icon {
  margin: auto;
  padding: 8px;
}

.profile-icon:hover {
  opacity: 0.5;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.4)
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
  overflow: scroll;
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
  filter: brightness(3) invert(1);
}

.nav-item-bounty {
  width: 42px;
  height: 42px;
  padding: 10px;
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
  margin: 24px;
  margin-left: 124px;
  width: calc(100vw - 200px);
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

@media(max-width: 700px) {
  .app {
    flex-direction: column;
  }

  #leftSide {
    height: 60px;
    top: 0;
    width: 100vw;
    display: flex;
    flex-direction: row;
    overflow-y: auto;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;

  }

  #content {
    padding: 6px;
    margin-top: 100px;
    z-index: -100;
    margin-left: 0px;
    width: auto;

  }

  /* Hide the menu and only display when the button is clicked. */
  .menu-icon {
    height: 32px;
    width: 32px;
    padding: 6px;
    filter: brightness(0) invert(0.8);
    display: block;


  }

  .menu-icon:hover {
    opacity: 0.8;
  }

  #nav {
    top: 60px;
    width: 100vw;
    background: #21212a;
    left: 0;
    flex-direction: column;
    height: auto;
    position: fixed;
    z-index: 1000;
    overflow-y: scroll;
    height: 100%;
  }

  #logo {
    padding: 0;
    margin: 0;
    padding-left: calc(50% - 24px);
    width: auto;
  }


}
</style>
