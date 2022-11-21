<script lang="ts">
import {useAccountStore} from "@/stores/account"
import { createIcon } from "@download/blockies";


export default {
  setup(){
    const account = useAccountStore();

    var icon = createIcon({
          // All options are optional
          seed: account.address, // seed used to generate icon data, default: random
          color: "#dfe", // to manually specify the icon color, default: random
          bgcolor: "transparent", // choose a different background color, default: white
          size: 10, // width/height of the icon in blocks, default: 10
          scale: 3, // width/height of each block in pixels, default: 5
        });

    return {account, icon}
  }
};
</script>

<template>
  <div class="account-details">
      <div class="account-stats">

        <div class="icon">
          <div class="icon-img">
            <img src="@/assets/logo.svg" alt="profilePic"  />
          </div>
        </div>

          <div class="column">
            {{account.network}}
            <span>{{account.address.substring(1, 6)}} ... {{account.address.substring(account.address.length - 5)}}</span>
          </div>
     

          <div class="balances">
            <div class="balance">
              <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png" class="token-icon" />
              <span class="balance-amount">
                {{account.balance}}
              </span>
            </div>
            <div class="balance">
              <img src="@/assets/images/logo.png" class="token-icon" />
              <span class="balance-amount">
                {{account.tokenBalance}}
              </span>
            </div>
          </div>
      </div>
      

  </div>
</template>
<style>
.account-details {
  position: absolute;
  background:#353442;
  top:64px;
  right: 1rem;
  padding: 2rem;
  width: 300px;
  height: 300px;
  border-radius: 8px;
  z-index: 100;
}
.account-stats{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.token-icon{
  height: 32px;
  width: 32px;
  border-radius: 50%;
}
.balances{
  display: flex;
  flex-wrap:wrap;
  justify-content: space-evenly;
  gap: 2rem;
  align-items: center;
}
.balance{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}
.balance-amount{
  font-weight: 500;
}
.icon-img{
  height: 64px;
  width: 64px;
  border-radius: 50%;
}
</style>