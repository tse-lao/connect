<template>
    <div>
        <input v-model="amount" />
        <button @click="approve">Desposit</button>
        
    </div>
</template>
<script lang="ts">
import {useAccountStore} from '@/stores/account';
import token from "../../store/api/token";

export default {

    data(){
        return{
            amount: "",
            events: []
        }
    }, 
    methods:{
        async approve(){
                if(this.address != ""){
                    let approval = await token.approve(this.amount,this.address, this.account.address)
                    console.log(approval);
                }
        },
       
        
    }, 
    props:{
        address: {
            type:String, 
            default: ""
        }
    }, 
    setup(){
        const account = useAccountStore()

        return {account}
    },
}
</script>
