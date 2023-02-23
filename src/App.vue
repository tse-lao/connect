<script lang="ts">
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import "./assets/main.css";
import AccountDetails from "./components/Account/AccountDetails.vue";
import ProfilePicture from "./components/Account/ProfilePicture.vue";
import Header from "./components/Design/Header.vue";
import Sidebar from "./components/Design/Sidebar.vue";
import SetupView from "./components/Setup/SetupView.vue";
import { useAccountStore } from "./stores/account.js";

export default {
  name: "App",
  components: { AccountDetails, ProfilePicture, SetupView, Sidebar, Header },
  data() {
    return {
      viewAccount: false,
      showNav: false,
      big: true,
      correctNetwork: false,
    };
  },
  setup() {
    const account = useAccountStore();
    const accountModal = ref(false);
    const accountTarget = ref(null);
    //we do something with the outside.
    onClickOutside(accountTarget, (event) => {
      accountModal.value = false;
    });

    return { account, accountModal, accountTarget };
  },
  methods: {
    login() {
      this.account.getAccount();
      console.log("account getting.");
      //we call the child component to rerender;
    },
    detailsShow() {
      this.viewAccount = !this.viewAccount;
    },
    onResize() {
      if (window.innerWidth > 700) {
        this.big = true;
        return;
      }
      this.big = false;
      return;
    },

    async networkCheck() {
      const network = await window.ethereum.networkVersion;
      if (network == 80001) {
        this.correctNetwork = true;
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    }),
      this.login();
  },
  created() {
    if (typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", this.login);
      window.ethereum.on("chainChanged", this.login);
      window.ethereum.on("message", (message: any) => {
        console.log(message);
      });
    }
  },
};
</script>
<template color-scheme="dark">
  <div>
    <div class="header">
      <div class="menu-icon" @click="showNav = !showNav">
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
      </div>
      <Header @click="accountModal = !accountModal" />
    </div>
    <AccountDetails ref="accountTarget" v-if="accountModal" />
    <div class="app">
      <div id="leftSide" v-if="showNav">
        <Sidebar />
      </div>
      <div id="content">
        <RouterView v-if="account.network === '0x13881'" />
        <div v-else>
          <SetupView />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped >
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
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 64px;
  background: rgba(255, 255, 255, 0.1);
  justify-content: space-between;
}

.menu-icon {
  padding: 1rem;
  margin-left: 1rem;
  cursor: pointer;
  display: flex;
  align-content: center;
  flex-direction: column;
  align-items: center;
}
.menu-icon div {
  height: 2px;
  width: 32px;
  background-color: rgba(255, 255, 255, 0.7);
  margin-bottom: 6px;
}
.app {
  display: flex;
  flex-flow: row;
  gap: 10px;
  width: 100vw;
  overflow: hidden;
}

.formkit-input {
  color: white !important;
}

#leftSide {
  height: 100vh;
  background-color: #21212a;
  display: flex;
  flex-direction: column;
  top: 0;
  bottom: 0;
  position: relative;
  overflow: hidden;
}

#content {
  margin: 24px;
  height: calc(100vh - 63px);
  justify-content: flex;
  flex: 1 1 100%;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
#content::-webkit-scrollbar {
  display: none;
}
</style>
