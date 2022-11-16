<template>
    <div>
        <input v-model="amount" />
        <button @click="approve">Desposit</button>
        
    </div>
</template>
<script lang="ts">
import {useAccountStore} from '@/stores/account';
import token from "../../store/api/token";
import bounties from '@/store/api/bounties';
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
                    if(this.amount != ""){
                        let approval = await token.approve(this.amount,this.address, this.account.address)
                         console.log(approval);
                        let result = await bounties.depositToContract(this.address, this.account.address, this.amount);
                        console.log(result);
                    }

                }

                //so now we have a approved amount for this user on this address lets see it 
        },

        async getApprovedAmount(){
            let allowance = await token.allowance(this.address, this.account.address);
            console.log(allowance)
        }
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
    mounted(){
        this.getApprovedAmount();
    }
}
</script>
