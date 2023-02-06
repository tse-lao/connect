<template>
    <div class="stat">
        <div class="label">
            MATIC balance
            <span>
                {{account.balance}}
            </span>
        </div>
        <div class="label">
            CFT Test balance
            <span>
                {{account.tokenBalance}}
            </span>
        </div>
    </div>
    
    <StoreData />
    <AirdropVue />
</template>

<script lang="ts">
import AirdropVue from '@/components/Dashboard/Airdrop.vue';
import StoreData from '@/components/Data/StoreData.vue';
import { useAccountStore } from "@/stores/account";

export default{
    name: "AirdropView",
    components: {AirdropVue, StoreData} , 
    setup(){
        let account = useAccountStore();

        return {account}
    }
}
</script>