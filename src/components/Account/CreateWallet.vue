<script lang="ts">
import accounts from "@/store/api/accounts";
import { useAccountStore } from "@/stores/account"
import { createIcon } from "@download/blockies";
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import ProfileRegistration from "./ProfileRegistration.vue";
import profile from "@/store/api/profile";
import SignIn from "./SignIn.vue";

export default {
  data(){
    return{
      password: "", 
      
    }
  }, 
  setup() {
    const account = useAccountStore();
    const accountTarget = ref(null)
    
    //we do something with the outside. 
    onClickOutside(accountTarget, (event) => {
      changeName.value = false;

    })
    const changeName = ref(false);
    var icon = createIcon({
      // All options are optional
      seed: account.address,
      color: "#dfe",
      bgcolor: "transparent",
      size: 10,
      scale: 3, // width/height of each block in pixels, default: 5
    });
    return { account, icon, changeName, accountTarget };
  },
  methods:{
    async createWallet(){ 
      //create a wallet offline, see how it works with ethers. 
    }
  },
  components: { ProfileRegistration, SignIn }
};
</script>

<template>
  <div class="account-details">
        <input v-model="password"/>
        <button name="createWallet" @click="createWallet">Create Wallet</button>

  </div>
</template>
<style>
.account-details {
  position: absolute;
  background: #353442;
  top: 64px;
  right: 1rem;
  padding: 2rem;
  width: 300px;
  height: 300px;
  border-radius: 8px;
  z-index: 100;
}

.account-stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.token-icon {
  height: 32px;
  width: 32px;
  border-radius: 50%;
}

.balances {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 2rem;
  align-items: center;
}

.balance {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.balance-amount {
  font-weight: 500;
}

.icon-img {
  height: 64px;
  width: 64px;
  border-radius: 50%;
}

button.network {
  background: #8247e5;
  border-radius: 8px;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  font-size: 12px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.username {
  font-weight: 800;
  display: flex;
  align-items: center;
}

.inline-input{
  background: none;
  border-bottom: 1px solid green;
  padding: 4px;
  font-size: 12px;
  width: 120px;
  text-align: right;
}
.align-center {
  align-items: center;
}

button.sm {
  padding: 0px;
  margin-left: 1rem;
}
 button img{
  height: 16px;
  width: 16px;
  filter: invert(1);
 }
</style>