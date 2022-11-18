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
        <div>
            <span>Airdrop Address:</span>
            <a href="https://mumbai.polygonscan.com/address/0x38621BFD63b7CBF998dc79213ebAc5C88b96Af0e">
                {{airdrop}}
            </a>
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
            airdrop: "",
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
            this.airdrop = import.meta.env.VITE_AIRDROP_ADDRESS;
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