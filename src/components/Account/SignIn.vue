<template>
    <main>
        <div>
            <button @click="connectWallet">
                Login
            </button>
        </div>
    </main>
</template>

<script lang="ts">
import SignClient from "@walletconnect/sign-client";
import { ConfigCtrl, ModalCtrl } from "@web3modal/core"

export default {
    name: "ConnectModal",
    methods: {
        async connectWallet() {
            const signClient = await SignClient.init({ projectId: import.meta.env.VITE_WALLET_CONNECT_ID });

            ConfigCtrl.setConfig({
                projectId: import.meta.env.VITE_WALLET_CONNECT_ID,
                enableStandaloneMode: true,
                standaloneChains: ["eip155:1"],
            });

            const { uri, approval } = await signClient.connect({
                requiredNamespaces: {
                    eip155: {
                        methods: ["eth_sign"],
                        chains: ["eip155:1"],
                        events: ["accountsChanged"],
                    },
                }
            })

            console.log(uri, approval);
        },
    }

   }
</script>