<template>
    <main>
        <div>
            <h3>
                Welcome, {{ account.address }}
            </h3>
            <div class="step">
                <ol>
                    <li>
                        When Metamask is installed you will automatically pop up metamask.
                    </li>
                    <li>
                        If it does not pop up click here:
                        <button class="open-meta" @click="account.getAccount">
                            Open metamask
                        </button>
                    </li>
                    <li>
                        Please connect your account to the website.
                    </li>
                    <img src="@/assets/images/tutorials/metamask/metamask-connect.png" alt="connect" />

                </ol>
            </div>
            <button @click="changeStep">
                Next step
            </button>
        </div>
    </main>
</template>

<script lang="ts">
import { useAccountStore } from "@/stores/account"
export default {
    data() {
        return {
            account: ""
        }
    },
    setup() {
        let account = useAccountStore();
        return { account }
    },
    methods: {
        changeStep() {
            this.$emit("nextStep", "Setup3");
        },
        checkStep(){
            if(this.account.address != ""){
                this.changeStep();
            }
        }
    }, 
    mounted(){
        this.checkStep();
        this.account.getAccount();
    }
}
</script>
<style>
.open-meta {
    background: none;
    color: hsla(160, 100%, 37%, 1);
    text-transform: capitalize;
    cursor: pointer;
}

.open-meta:hover {
    color: rgba(255, 255, 255 0.9)
}
</style>