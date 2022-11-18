<template>
    <main>
        <div>
            <h3>Adding Mumbai Chain to network</h3>

            <div class="step">
                <ol>
                    <li>
                        Last step is to add the chain to the network 
                    </li>
                    <li>
                        Click here to add the chain to the network <br>
                        <button class="open-meta" @click="changeNetwork">
                            Add Mumbai network
                        </button>
                    </li>
                    <img src="@/assets/images/tutorials/metamask/add-chain.png" alt="add_chain" />

                    <li>
                        Then we switch from the current network to the mumbai network
                    </li>
                    <img src="@/assets/images/tutorials/metamask/switch-network.png" alt="switch_network"/>
                    
                </ol>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { useAccountStore } from "@/stores/account"
export default {
    name: "ThirdStep",
    setup() {
        let account = useAccountStore();

        return { account }
    },
    methods: {
        async changeNetwork() {
            await this.addChainToMetaMask();

            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [
                        { chainId: '0x13881' }
                    ]
                })
            } catch (e) {
                console.log(e)
                this.addChainToMetaMask();
            }
        },

        async addChainToMetaMask() {
            //here we just add it instead of switch it 
            const params = [{
                chainId: '0x13881', // 8001
                chainName: 'Mumbai',
                nativeCurrency: {
                    name: 'MATIC Token',
                    symbol: 'MATIC',
                    decimals: 18,
                },
                rpcUrls: ['https://matic-mumbai.chainstacklabs.com/'],
                blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
            }]

            await window.ethereum.request({
                method: 'wallet_addEthereumChain', params
            }).then(() => { console.log('addded succesfully') })
        }
}
}
</script>