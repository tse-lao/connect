<template>
    <div class="airdrop">
        <div class="stat">
            <div class="label">
                Token balance
                <span class="number">{{ balance.token }}</span>
            </div>
            <div class="label">
                Matic balance:
                <span class="number">
                    {{ balance.matic }}
                </span>
            </div>

            <div class="label">
                Cost for claiming:
                <span class="number">
                    {{ data.cost }}
                </span>
            </div>
            <div class="label">
                Total Claimable Tokens
                <span class="number">
                    {{ data.dropAmount }}
                </span>

            </div>
        </div>

        <div>
            <h3>Address:</h3>
            <a v-bind:href="'https://mumbai.polygonscan.com/address/'+ airdrop" target="_blank">
                {{ airdrop }}
            </a>
        </div>

        <div v-if="account.address.toLowerCase() == tokenOwner.toLowerCase">
            <input v-model="tokenAmount" placeholder="withdraw" />

            <button @click="withdrawTokens">Withdraw Tokens</button>
            <button @click="withdraw">Withdraw Matic</button>
        </div>

        <div class="form" v-if="account.balance > data.cost">
            <button @click="claimToken" :disabled="registered">Claim Token</button>

            
        </div>
        <span class="error" v-if="registered">You already have claimed the tokens</span>
        <div v-else>
            Unfortunately you do not have enough Matic,
            <a href="https://faucet.polygon.technology/" target="_blank">
                please go to Polygon Matic to apply for matic to exchange.
            </a>
            <div>
                <button class="inline" @click="copy(account.address)">
                    <span v-if='!copied'>Copy</span>
                    <span v-else>Copied!</span>
                </button>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import airdrop from "@/store/api/airdrop"
import { useAccountStore } from "@/stores/account"
import { useClipboard } from '@vueuse/core'




export default {
    name: "AirdropInteraction",
    data() {
        return {
            account: {
                address: ""
            },
            balance: {
                matic: 0,
                token: 0,
            },
            amount: "",
            registered: true,
            tokenBalance: 0,
            airdrop: "",
            tokenAmount: "",
            data: {
                conversionRate: 0,
                dropAmount: 0,
                cost: 0,
            },
            tokenOwner: "",
        }
    },
    setup() {
        const account = useAccountStore();
        const { copy, copied } = useClipboard()
        return { account, copy, copied };
    },
    methods: {
        async startUp() {
            this.airdrop = import.meta.env.VITE_AIRDROP_ADDRESS;

            const balance = await airdrop.readBalances();
            const claimable = await airdrop.checkRegisted();

            console.log(claimable);
            const owner = await airdrop.owner();
            const dataResult = await airdrop.getConverstion();


            this.registered = claimable;
            this.balance = balance;
            this.tokenOwner = owner;
            this.data = dataResult
        },
        async claimToken() {
            const result = await airdrop.claimToken();
        },
        async withdrawTokens() {
            console.log(this.tokenAmount)
            const result = await airdrop.withdrawTokens(this.tokenAmount);
        },
        async withdraw() {
            const result = await airdrop.withdraw(this.tokenAmount);
        }
    },
    mounted() {
        this.startUp();
    }
}
</script>

<style>
.airdrop {
    display: flex;
    gap: 2rem;
    flex-direction: column;
    margin: 2rem;
    justify-content: center;
    align-items: center;
    text-align:center;

}

.stat {
    display: flex;
    gap: 3rem;
    flex-wrap: wrap;
    justify-content: space-evenly;
    text-align: center;
    margin: 3rem;
}

.label {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

.label .number {
    color: white;
    font-weight: 600;
    letter-spacing: 0.2rem;

}
</style>