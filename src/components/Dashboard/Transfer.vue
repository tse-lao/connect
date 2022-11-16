<template>
    <div class="transfer">
        <input v-model="amount" placeholder="Enter the amount..."/>
        <input v-model="receiver" placeholder="Receivers address."/>
        <button @click="transferToken">Transfer</button>
    </div>
</template>

<script lang="ts">
import {useAccountStore} from "@/stores/account"
import token from "@/store/api/token"

export default {
    name: "TranferToken", 
    data(){
        return{
            amount: "", 
            receiver: "", 
        }
    }, 
    setup(){
        const account = useAccountStore()
        return {account}
    }, 
    methods:{
        async transferToken(){
            console.log(this.receiver)
            console.log(this.account.address)


              const result = await  token.transfer(this.account.address, this.receiver, this.amount)

              console.log(result)
        }
    }, 
}
</script>
<style>
.transfer{
    display: flex;
    flex-direction: column;
    gap:2rem;
}
</style>