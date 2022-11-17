<template>
    <div class="airdrop">
        <div>
            Token balance: {{tokenBalance}}
        </div>
        <div>
            Matic balance: {{balance}}
        </div>

        <div>
            Cost for claiming: {{data.cost}}
        </div>
        <div>
            Total Claimable Tokens {{data.dropAmount}}
        </div>

        <div class="form">
            <button @click="claimToken">Claim Token</button>
        </div>
    </div>
</template>

<script lang="ts">
import airdrop from "@/store/api/airdrop"
export default{
    name: "AirdropInteraction", 
    data(){
        return {
            account: "",
            balance: 0, 
            amount: "",
            tokenBalance: 0,
            data: {
                conversionRate: 0, 
                dropAmount: 0, 
                cost: 0,
            },
            tokenOwner: "",
        }
    },
    methods:{
        async startUp(){

            const result = airdrop.readAccount();
            this.account = result;

            const balance = await airdrop.readBalances();

            this.balance = balance.matic;
            this.tokenBalance = balance.token;
            const owner = await airdrop.owner();
            this.tokenOwner = owner;

            const dataResult = await airdrop.getConverstion();

            this.data = dataResult
        }, 
        async claimToken(){
            const result = await airdrop.claimToken();
        }
    }, 
    mounted(){
        this.startUp();
    }
}
</script>

<style>
.airdrop{
    display: flex;
    gap: 2rem;
    flex-direction: column;
    margin: 2rem;
}
</style>